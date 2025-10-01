import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendMail = async (toEmail, OTP) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: toEmail,
    subject: "Reset Your Password",
    html: `<p>
        Your OTP for Password Reset Is <b>${OTP}</b>. Expires In 5 Minutes.
      </p>`,
  });

  console.log("mail send to" + toEmail + "successfully!");
};
