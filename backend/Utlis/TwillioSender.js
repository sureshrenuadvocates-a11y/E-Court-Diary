import cron from "node-cron";
import Ediary from "../Models/EdiaryModel.js";
import Auth from "../Models/AuthModel.js";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Run every day at 9 AM IST (change to * * * * * for testing)
cron.schedule("* 6 * * *", async () => {
  console.log("Running cron job...");

  // Get today's date range (start and end of day)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

  console.log("Checking for hearings between:", today.toISOString(), "and", tomorrow.toISOString());

  try {
    const cases = await Ediary.find({
      Hearingdate: {
        $gte: today,
        $lt: tomorrow
      }
    });

    console.log("Found cases:", cases.length);
    console.log("Cases data:", cases.map(c => ({
      CaseNo: c.CaseNo,
      Petitioner: c.Petitioner,
      Court: c.Court,
      Hearingdate: c.Hearingdate
    })));

    if (!cases.length) {
      console.log("No hearings today");
      return;
    }

    for (let c of cases) {

      const user = await Auth.findById(c.userId);

      if (!user || !user.MobileNumber) {
        console.log(`❌ No phone found for case ${c.CaseNo}`);
        continue;
      }
      let phone = user.MobileNumber.toString().trim();

      if (!phone.startsWith("+91")) {
        phone = `+91${phone}`;
      }

      await client.messages.create({
        body: `📢 Court Reminder

Case No: ${c.CaseNo}
Petitioner: ${c.Petitioner}
Court: ${c.Court}
Date: Today

Please be present on time.`,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${phone}`,
      });

      console.log(`✅ Sent reminder to ${phone}`);
      
    }

  } catch (err) {
    console.error("❌ Cron Error:", err);
  }
});