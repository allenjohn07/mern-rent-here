import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  EmailOtp: {
    type: Number,
  },
  PhoneOtp: {
    type: Number,
  },
  isEmailVerified: {
    type: Boolean,
  },
  isPhoneVerified: {
    type: Boolean,
  },
});

export const User = mongoose.model("users", userSchema);
