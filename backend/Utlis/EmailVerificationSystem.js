import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER || "aabc79001@smtp-brevo.com",
    pass: process.env.BREVO_PASS || "",
  },
});

export const sendOTPEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"E-Court Diary" <${process.env.BREVO_USER}>`,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family:sans-serif;padding:20px">
          <h1 style="color:#4F46E5">E-Court Diary</h1>

          <p>Your verification OTP is:</p>

          <h2 style="letter-spacing:4px">${otp}</h2>

          <p>This OTP expires in 10 minutes.</p>
        </div>
      `,
    });

    console.log("EMAIL SENT:", info.messageId);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};
