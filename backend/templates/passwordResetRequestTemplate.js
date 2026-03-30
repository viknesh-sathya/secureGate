export const PASSWORD_RESET_REQUEST_TEMPLATE = (name, resetURL) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SecureGate Password Reset</title>
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
      <p style="font-size:16px; color:#064e3b;">Hello ${name},</p>

      <p style="font-size:15px; color:#065f46;">
        We received a request to reset your SecureGate password.
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="font-size:15px; color:#065f46;">
        Click the button below to reset your password:
      </p>

      <!-- Button -->
      <div style="text-align:center; margin:30px 0;">
        <a href="${resetURL}"
          style="
            background:#10b981;
            color:#ffffff;
            padding:14px 24px;
            text-decoration:none;
            border-radius:6px;
            font-weight:bold;
            display:inline-block;
          ">
          Reset Password
        </a>
      </div>

      <p style="font-size:14px; color:#065f46;">
        This link will expire in <strong>1 hour</strong> for security reasons.
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
