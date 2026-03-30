import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/user.model.js";

import { generateTokenAndSendCookie } from "../utils/generateTokenAndSendCookie.js";
import { sendVerificationEmail } from "./../mails/sendVerificationEmail.js";
import { sendWelcomeEmail } from "./../mails/sendWelcomeEmail.js";
import { sendPasswordResetEmail } from "./../mails/sendPasswordResetEmail.js";
import { sendPasswordResetSuccessEmail } from "./../mails/sendPasswordResetSuccessEmail.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // 1. Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Generate verification token
    const verificationToken = String(
      Math.floor(100000 + Math.random() * 900000),
    );

    // 5. Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000, // 10 min
    });

    // 6. Remove password before sending response
    const safeUser = user.toObject();
    delete safeUser.password;

    // 7. Send verification email
    await sendVerificationEmail({
      email: safeUser.email,
      name: safeUser.name,
      verificationToken: safeUser.verificationToken,
    });

    // 8. Generate JWT + send cookie
    const token = generateTokenAndSendCookie(res, user._id);

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
      data: { user: safeUser },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({
        status: "failed",
        message: "Invalid or expired verification code",
      });
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    //  Remove password before sending response
    const safeUser = user.toObject();
    delete safeUser.password;

    await sendWelcomeEmail({ name: safeUser.name, email: safeUser.email });

    res.status(200).json({
      status: "success",
      message: "user successfully verified",
      data: {
        user: safeUser,
      },
    });
  } catch (err) {
    console.log("❌Error in verify email");
    res.status(500).json({
      status: "error",
      message: "Server error" + err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      });
    const token = await generateTokenAndSendCookie(res, user._id);
    user.lastLogin = new Date();
    user.save();

    //  Remove password before sending response
    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({
      status: "success",
      message: "Loggin successfull",
      data: {
        user: safeUser,
      },
    });
  } catch (err) {
    console.log("Something went very wrong in login");
    res.status(500).json({
      status: "error",
      message: "Server error" + err.message,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const genericResponse = {
      status: "success",
      message:
        "If an account with that email exists, you will receive a password reset email shortly.",
    };

    if (!email)
      return res
        .status(400)
        .json({ status: "failed", message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json(genericResponse);
    }

    // 1) Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex"); // 64 hex chars

    // 2) Hashed Token & save to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });

    // 3) Build reset URL with plain token
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const safeUser = user.toObject();
    delete safeUser.password;

    // 5) Send email
    await sendPasswordResetEmail({
      name: safeUser.name,
      email: safeUser.email,
      resetURL,
    });

    return res.status(200).json(genericResponse);
  } catch (err) {
    console.error("forgotPassword error", err);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    //hash the user's token to compare with the DB passwordResetToken
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpiresAt: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid or expired token" });
    }

    //Save new password
    const newPassword = await bcrypt.hash(password, 12);
    user.password = newPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpiresAt = undefined;

    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;

    //send email
    await sendPasswordResetSuccessEmail({
      name: safeUser.name,
      email: safeUser.email,
    });
    res.status(200).json({
      status: "success",
      message: "Password reset successfull",
    });
  } catch (err) {
    console.error("Reset Password error", err);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    const { userId } = req; // got from verifyToken middleware
    const user = await User.findById(userId);
    if (!user)
      return res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.error("Checkl auth error", err);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const authController = {
  checkAuth,
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
export default authController;
