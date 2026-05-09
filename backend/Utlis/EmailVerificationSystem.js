import axios from "axios";

export const sendOTPEmail = async (email, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "E-Court Diary",
          email: "armandhull5540@gmail.com",
        },

        to: [
          {
            email,
          },
        ],

        subject: "Email Verification OTP",

        htmlContent: `
          <h1>E-Court Diary</h1>
          <h2>${otp}</h2>
          <p>This OTP expires in 10 minutes.</p>
        `,
      },

      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log(response.data);

    return true;

  } catch (error) {
    console.log(
      error.response?.data || error.message
    );

    return false;
  }
};
