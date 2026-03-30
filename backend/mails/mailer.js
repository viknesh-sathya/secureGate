import nodemailer from "nodemailer";

const isProduction = process.env.NODE_ENV === "production";
let transporter;

//MAILTRAP
if (!isProduction) {
  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

// BREVO
if (isProduction) {
  transporter = nodemailer.createTransport({
    host: process.env.BREVO_HOST,
    port: Number(process.env.BREVO_PORT),
    secure: Number(process.env.BREVO_PORT) === 465,
    auth: {
      user: process.env.BREVO_USERNAME,
      pass: process.env.BREVO_PASSWORD,
    },
  });
}

// VERIFY TRANSPORTER
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mailer connection failed:", error);
  } else {
    console.log("✅ Mailer is ready to send emails");
  }
});

// RESUABLE SEND EMAIL FUNCTION
export async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: isProduction
        ? `"SecureGate" <${process.env.BREVO_MAIL}>`
        : process.env.MAIL_FROM,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Failed to send email");
  }
}

export default transporter;
