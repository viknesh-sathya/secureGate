import { sendEmail } from "./mailer.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "../templates/passwordResetRequestTemplate.js";

export const sendPasswordResetEmail = async ({ email, name, resetURL }) => {
  try {
    await sendEmail({
      to: email,
      subject: "Reset your SecureGate password (expires in 1 hour)",
      html: PASSWORD_RESET_REQUEST_TEMPLATE(name, resetURL),
    });
  } catch (err) {
    console.log("❌ Error sending ResetPass email:", err.message);
  }
};
