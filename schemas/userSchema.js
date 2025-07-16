import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  gmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  AltimatAdmin: { type: Boolean, default: false },
  profile: {
    country: String,
    Number: Number,
    Street: String,
    Bio: String
  },
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },
  lastOtpSentAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;