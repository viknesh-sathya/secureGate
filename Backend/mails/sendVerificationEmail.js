import { sendEmail } from "./mailer.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "../templates/verificationEmailTemplate.js";

export const sendVerificationEmail = async ({
  email,
  name,
  verificationToken,
}) => {
  try {
    await sendEmail({
      to: email,
      subject: "Verify your SecureGate account (expires in 10 min)",
      html: VERIFICATION_EMAIL_TEMPLATE(verificationToken, name),
    });
  } catch (err) {
    console.log("❌ Error sending verification:", err.message);
  }
};
