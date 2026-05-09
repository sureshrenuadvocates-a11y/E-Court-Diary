import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'armandhull5540@gmail.com',
    pass: process.env.EMAIL_PASS || 'ohpjncbkxclkttzu',
  },
});

export const sendOTPEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"E-Court Diary" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <h1>E-Court Diary</h1>
        <h2>${otp}</h2>
      `,
    });

    console.log(info);

  } catch (error) {
    console.log(error);
  }
};
