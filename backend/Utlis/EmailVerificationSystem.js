import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  pool: true,
  maxConnections: 5,
  maxMessages: 100,

 auth: {
    user: process.env.EMAIL_USER || 'armandhull5540@gmail.com',
    pass: process.env.EMAIL_PASS || 'ohpjncbkxclkttzu',
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Email transporter error:", error);
  } else {
    console.log("Email server is ready");
  }
});

export const sendOTPEmail = async (email, otp) => {
  try {
    console.log(`Sending OTP email to ${email}`);

    const info = await transporter.sendMail({
      from: `"E-Court Diary" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification OTP - E-Court Diary",

      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        
        <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">

          <h1 style="color: #4A90E2; text-align: center;">
            E-Court Diary
          </h1>

          <h2 style="text-align: center; color: #333;">
            Email Verification
          </h2>

          <p style="font-size: 16px; color: #555;">
            Dear User,
          </p>

          <p style="font-size: 16px; color: #555;">
            Thank you for registering with E-Court Diary.
            Please use the following OTP to verify your email address:
          </p>

          <div style="
            text-align: center;
            margin: 30px 0;
          ">
            <span style="
              display: inline-block;
              padding: 15px 30px;
              font-size: 32px;
              letter-spacing: 6px;
              background-color: #4A90E2;
              color: white;
              border-radius: 8px;
              font-weight: bold;
            ">
              ${otp}
            </span>
          </div>

          <p style="font-size: 15px; color: #777;">
            This OTP will expire in 10 minutes.
          </p>

          <p style="font-size: 15px; color: #777;">
            If you did not request this verification, please ignore this email.
          </p>

          <hr style="margin-top: 30px;" />

          <p style="font-size: 13px; color: #999; text-align: center;">
            © 2026 E-Court Diary. All rights reserved.
          </p>

        </div>

      </div>
      `,
    });

    console.log("OTP email sent successfully");
    console.log("Message ID:", info.messageId);

    return true;

  } catch (error) {
    console.log("Email sending failed:");
    console.log(error);

    return false;
  }
};
