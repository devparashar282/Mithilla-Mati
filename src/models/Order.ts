import mongoose, { Schema, Document, models } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  orderId: string;
  productName: string;
  productImage?: string;
  variant: string;
  quantity: number;
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  currentStep: number;
  isCancelled: boolean;
  createdAt: Date;
}

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: false,
    },
    variant: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Pending", // Paid, Pending, Refunded
    },
    paymentMethod: {
      type: String,
      required: true, // UPI, Credit Card, Cash on Delivery
    },
    currentStep: {
      type: Number,
      default: 0, // 0 = Placed, 1 = Confirmed, etc. up to 6 = Delivered
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = models.Order || mongoose.model<IOrder>("Order", OrderSchema);
