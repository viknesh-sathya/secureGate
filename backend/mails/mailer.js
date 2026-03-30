import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const emailData = {
      sender: {
        name: "SecureGate",
        email: process.env.BREVO_MAIL,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    console.log("Sending email with:", emailData);

    // Use the apiInstance here
    const response = await apiInstance.sendTransacEmail(emailData);
    console.log("📧 Email sent successfully:", response);
    return true;
  } catch (error) {
    console.error(
      "❌ Email sending failed:",
      error.response?.text || error.message,
    );
    return false;
  }
};
