import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || 'armandhull5540@gmail.com',
    pass: process.env.EMAIL_PASS || 'ohpjncbkxclkttzu',
  },
});

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification OTP for E-Court Diary",
    html: `
  <h1 style="color: #4A90E2;">E-Court Diary Email Verification</h1>
      <p>Dear User,</p>
      <p>Thank you for registering with E-Court Diary. To complete your registration and verify your email address, please use the following One-Time Password (OTP):</p>
      <h2>Your OTP Code</h2>
      <p>${otp}</p>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  });
};