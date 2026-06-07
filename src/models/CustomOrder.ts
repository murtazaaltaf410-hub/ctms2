import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICustomOrder extends Document {
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bouquetType: string;
  occasion: string;
  denomination: string;
  referenceImage?: string;
  specialInstructions?: string;
  deliveryDate: Date;
  status: "pending" | "reviewing" | "approved" | "in-progress" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const CustomOrderSchema = new Schema<ICustomOrder>(
  {
    userId: { type: String },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    bouquetType: { type: String, required: true },
    occasion: { type: String, required: true },
    denomination: { type: String, required: true },
    referenceImage: { type: String },
    specialInstructions: { type: String },
    deliveryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewing", "approved", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const CustomOrder: Model<ICustomOrder> =
  mongoose.models.CustomOrder || mongoose.model<ICustomOrder>("CustomOrder", CustomOrderSchema);
export default CustomOrder;
