import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    details: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    }
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
