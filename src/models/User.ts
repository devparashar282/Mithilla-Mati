import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  mobile: string;
  password?: string;
  gender?: string;
  walletBalance: number;
  rewardPoints: number;
  addresses: {
    id: string;
    fullName: string;
    mobile: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    isDefault: boolean;
  }[];
  createdAt: Date;
}

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    rewardPoints: {
      type: Number,
      default: 0,
    },
    addresses: [
      {
        id: { type: String, required: true },
        fullName: { type: String, required: true },
        mobile: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true, default: "India" },
        pincode: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
      }
    ],
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model<IUser>("User", UserSchema);
