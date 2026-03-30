import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async (to, subject, html) => {
  try {
    const emailData = {
      sender: {
        name: "SecureGate",
        email: "no-reply@securegate.com", // You can use your Brevo sender email
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    const response = await apiInstance.sendTransacEmail(emailData);
    console.log("📧 Email sent successfully:", response.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return false;
  }
};
