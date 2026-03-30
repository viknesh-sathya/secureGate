import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const { to, subject, html } = options;
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
