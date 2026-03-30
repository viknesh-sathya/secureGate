import { sendEmail } from "./mailer.js";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "../templates/passwordResetSuccessTemplate.js";

export const sendPasswordResetSuccessEmail = async ({ email, name }) => {
  try {
    await sendEmail({
      to: email,
      subject: "Your password has been reset",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE(name),
    });
  } catch (err) {
    console.log("❌ Error sending ResetPass email:", err.message);
  }
};
