import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHomepageContent extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutSnippet: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
}

const HomepageContentSchema = new Schema<IHomepageContent>({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroImage: { type: String, required: true },
  aboutSnippet: { type: String, required: true },
  newsletterTitle: { type: String, required: true },
  newsletterSubtitle: { type: String, required: true },
});

const HomepageContent: Model<IHomepageContent> =
  mongoose.models.HomepageContent ||
  mongoose.model<IHomepageContent>("HomepageContent", HomepageContentSchema);
export default HomepageContent;
