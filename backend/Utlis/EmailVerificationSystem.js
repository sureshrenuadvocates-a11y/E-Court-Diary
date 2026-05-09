import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {
  try {

    const response = await resend.emails.send({
      from: "E-Court Diary <onboarding@resend.dev>",

      to: email,

      subject: "Email Verification OTP",

      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h1>E-Court Diary</h1>

          <h2>Your OTP:</h2>

          <div style="
            font-size: 32px;
            font-weight: bold;
            color: blue;
          ">
            ${otp}
          </div>

          <p>This OTP expires in 10 minutes.</p>
        </div>
      `,
    });

    console.log("Email sent:");
    console.log(response);

    return true;

  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);

    return false;
  }
};
