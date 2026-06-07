import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: "cookies" | "bouquets";
  images: string[];
  featured: boolean;
  inStock: boolean;
  inventory: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    category: { type: String, enum: ["cookies", "bouquets"], required: true },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    inventory: { type: Number, default: 100 },
    tags: [{ type: String }],
    rating: { type: Number, default: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", tags: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
