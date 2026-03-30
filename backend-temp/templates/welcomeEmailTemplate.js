export const WELCOME_EMAIL_TEMPLATE = (
  name,
  appUrl = process.env.CLIENT_URL,
  supportEmail = process.env.SUPPORT_EMAIL,
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to SecureGate</title>
</head>

<body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">

  <!-- Outer Wrapper -->
  <div style="max-width:600px; margin:0 auto; padding:20px;">

    <!-- SecureGate Header -->
    <div style="
      background:#064e3b;
      padding:25px 20px;
      text-align:center;
      border-radius:8px 8px 0 0;
    ">
      <h1 style="color:#ffffff; margin:0; font-size:24px; letter-spacing:1px;">
        Secure<span style="color:#34d399;">Gate</span>
      </h1>
      <p style="color:#a7f3d0; margin:5px 0 0; font-size:14px;">
        Security you can trust.
      </p>
    </div>

    <!-- Body Card -->
    <div style="
      background:#ffffff;
      padding:25px 20px;
      border-radius:0 0 8px 8px;
      box-shadow:0 2px 8px rgba(0,0,0,0.08);
    ">
      <p style="font-size:16px; color:#064e3b;">Hi ${name || "there"},</p>

      <p style="font-size:15px; color:#065f46;">
        Thanks for verifying your email — your SecureGate account is now active.
        We’re excited to have you on board.
      </p>

      <p style="font-size:15px; color:#065f46;">
        You can now access your dashboard to configure your account, enable
        two‑factor authentication, and explore integrations.
      </p>

      <!-- CTA Button -->
      <div style="text-align:center; margin:30px 0;">
        <a href="${appUrl || "#"}"
          style="
            background:#10b981;
            color:#ffffff;
            padding:14px 24px;
            text-decoration:none;
            border-radius:6px;
            font-weight:bold;
            display:inline-block;
          ">
          Go to your dashboard
        </a>
      </div>

      <p style="font-size:14px; color:#065f46;">
        Need help getting started? Reach out to us anytime at
        <a href="mailto:${supportEmail || "support@example.com"}"
          style="color:#10b981; text-decoration:none;">
          ${supportEmail || "support@example.com"}
        </a>.
      </p>

      <p style="font-size:14px; color:#065f46; margin-top:25px;">
        Stay safe,<br />
        <strong>The SecureGate Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center; margin-top:20px; color:#6b7280; font-size:12px;">
      <p>This is an automated message. Please do not reply.</p>
      <p>© ${new Date().getFullYear()} SecureGate. All rights reserved.</p>
    </div>

  </div>

</body>
</html>
`;
