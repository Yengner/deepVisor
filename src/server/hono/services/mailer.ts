import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

export const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    transporter.sendMail({
      subject,
      to: email,
      text,
    });
  } catch (e) {
    console.error(e);
    throw new Error("Failed to send email");
  }
}