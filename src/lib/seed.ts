import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Testimonial from "@/models/Testimonial";
import GalleryImage from "@/models/GalleryImage";
import HomepageContent from "@/models/HomepageContent";
import {
  seedProducts,
  seedCategories,
  seedTestimonials,
  seedGallery,
  seedHomepage,
} from "@/lib/seed-data";

async function seed() {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@veloragifts.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin user created:", adminEmail);
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(seedProducts);
    console.log("Products seeded:", seedProducts.length);
  }

  const categoryCount = await Category.countDocuments();
  if (categoryCount === 0) {
    await Category.insertMany(seedCategories);
    console.log("Categories seeded");
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany(seedTestimonials);
    console.log("Testimonials seeded");
  }

  const galleryCount = await GalleryImage.countDocuments();
  if (galleryCount === 0) {
    await GalleryImage.insertMany(seedGallery);
    console.log("Gallery seeded");
  }

  const homepageCount = await HomepageContent.countDocuments();
  if (homepageCount === 0) {
    await HomepageContent.create(seedHomepage);
    console.log("Homepage content seeded");
  }

  console.log("Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
