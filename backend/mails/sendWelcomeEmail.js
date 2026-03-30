import { sendEmail } from "./mailer.js";
import { WELCOME_EMAIL_TEMPLATE } from "../templates/welcomeEmailTemplate.js";

export const sendWelcomeEmail = async ({ name, email }) => {
  try {
    await sendEmail({
      to: email,
      subject: "Welcome to SecureGATE",
      html: WELCOME_EMAIL_TEMPLATE(name),
    });
  } catch (err) {
    console.log("❌ Error sending Welcome email:", err.message);
  }
};
