import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // prevents accidental exposure
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: String,
    verificationTokenExpiresAt: Date,

    passwordResetToken: String,
    passwordResetExpiresAt: Date,
  },
  { timestamps: true },
);

// Index for faster queries
// userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User;
