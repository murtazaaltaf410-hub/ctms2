import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryImage extends Document {
  title: string;
  image: string;
  category: "cookies" | "bouquets" | "events" | "customers";
  featured: boolean;
  createdAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["cookies", "bouquets", "events", "customers"],
      required: true,
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
export default GalleryImage;
