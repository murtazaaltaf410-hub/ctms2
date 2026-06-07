export const seedProducts = [
  {
    name: "Chocolate Chip Cookies",
    slug: "chocolate-chip-cookies",
    description:
      "Our signature chocolate chip cookies are handcrafted in small batches using premium Belgian chocolate chips and real butter. Each cookie features a golden, crisp exterior that gives way to a soft, chewy center — the perfect balance of texture and flavor that has made this our bestselling creation.",
    shortDescription:
      "Freshly baked cookies loaded with premium chocolate chips and a soft chewy center.",
    price: 18,
    compareAtPrice: 22,
    category: "cookies" as const,
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8ccf804f58?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 50,
    tags: ["bestseller", "classic", "chocolate"],
    rating: 4.9,
    reviewCount: 128,
  },
  {
    name: "Double Chocolate Cookies",
    slug: "double-chocolate-cookies",
    description:
      "For the true chocolate connoisseur, our double chocolate cookies combine rich Dutch-process cocoa with generous chunks of dark chocolate. Baked to perfection with a fudgy interior and slightly crisp edges, these indulgent treats deliver an intense chocolate experience in every bite.",
    shortDescription:
      "Rich cocoa cookies packed with chocolate chunks for true chocolate lovers.",
    price: 20,
    category: "cookies" as const,
    images: [
      "https://images.unsplash.com/photo-1558961363-fa8ccf804f58?w=800&q=80",
      "https://images.unsplash.com/photo-1607920590193-d0fae2c4a6c4?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 45,
    tags: ["chocolate", "premium", "indulgent"],
    rating: 4.8,
    reviewCount: 96,
  },
  {
    name: "Red Velvet Cookies",
    slug: "red-velvet-cookies",
    description:
      "Elegant and distinctive, our red velvet cookies capture the essence of the classic dessert in cookie form. Made with premium cocoa and a hint of cream cheese flavor, each cookie boasts a vibrant crimson hue and a luxuriously soft texture that melts in your mouth.",
    shortDescription:
      "Soft red velvet cookies with a delicate cream cheese flavor.",
    price: 22,
    category: "cookies" as const,
    images: [
      "https://images.unsplash.com/photo-1613478220435-7057bf053118?w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8ccf804f58?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 40,
    tags: ["red velvet", "elegant", "special"],
    rating: 4.9,
    reviewCount: 74,
  },
  {
    name: "Nutella Stuffed Cookies",
    slug: "nutella-stuffed-cookies",
    description:
      "A revelation for Nutella lovers everywhere. Our thick gourmet cookies are filled with a molten center of authentic Nutella hazelnut spread. Break one open and watch the warm, gooey filling cascade out — an unforgettable sensory experience that keeps customers coming back.",
    shortDescription:
      "Thick gourmet cookies with a molten Nutella center.",
    price: 24,
    compareAtPrice: 28,
    category: "cookies" as const,
    images: [
      "https://images.unsplash.com/photo-1607920590193-d0fae2c4a6c4?w=800&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 35,
    tags: ["nutella", "stuffed", "bestseller"],
    rating: 5.0,
    reviewCount: 156,
  },
  {
    name: "Butter Cookies",
    slug: "butter-cookies",
    description:
      "Timeless elegance in every bite. Our classic butter cookies are made with European-style cultured butter and a touch of Madagascar vanilla. Baked to a perfect golden hue, they offer a delicate, crumbly texture and a rich, buttery flavor that pairs beautifully with tea or coffee.",
    shortDescription:
      "Classic buttery cookies baked to golden perfection.",
    price: 16,
    category: "cookies" as const,
    images: [
      "https://images.unsplash.com/photo-1558961363-fa8ccf804f58?w=800&q=80",
      "https://images.unsplash.com/photo-1548365328-8967dc22c2e2?w=800&q=80",
    ],
    featured: false,
    inStock: true,
    inventory: 60,
    tags: ["classic", "butter", "elegant"],
    rating: 4.7,
    reviewCount: 89,
  },
  {
    name: "Assorted Cookie Box",
    slug: "assorted-cookie-box",
    description:
      "The ultimate gift for cookie enthusiasts. Our curated assortment features a handpicked selection of our bestselling flavors, elegantly presented in a luxury gift box with satin ribbon. Perfect for corporate gifts, celebrations, or treating someone special to a taste of everything we offer.",
    shortDescription:
      "A carefully curated collection of our bestselling flavors.",
    price: 45,
    compareAtPrice: 55,
    category: "cookies" as const,
    images: [
      "https://images.unsplash.com/photo-1548365328-8967dc22c2e2?w=800&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 30,
    tags: ["gift box", "assorted", "luxury"],
    rating: 4.9,
    reviewCount: 112,
  },
  {
    name: "Birthday Cash Bouquet",
    slug: "birthday-cash-bouquet",
    description:
      "Make birthdays truly unforgettable with our custom birthday cash bouquet. Each arrangement is handcrafted using real currency notes artfully folded into elegant floral shapes, adorned with premium ribbons, decorative accents, and personalized touches. Starting from $100 in notes, fully customizable to your budget.",
    shortDescription:
      "Custom money bouquet designed to make birthdays unforgettable.",
    price: 150,
    category: "bouquets" as const,
    images: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
      "https://images.unsplash.com/photo-1464349153739-4e1c2e8b8b8b?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 20,
    tags: ["birthday", "cash bouquet", "custom"],
    rating: 4.9,
    reviewCount: 67,
  },
  {
    name: "Wedding Cash Bouquet",
    slug: "wedding-cash-bouquet",
    description:
      "An exquisite gift for the happy couple. Our wedding cash bouquets feature elegant white and gold accents, delicate floral arrangements intertwined with carefully folded currency notes. Each piece is designed to complement wedding aesthetics while offering a practical and memorable gift.",
    shortDescription:
      "Elegant luxury bouquet crafted for weddings and engagements.",
    price: 250,
    compareAtPrice: 300,
    category: "bouquets" as const,
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 15,
    tags: ["wedding", "luxury", "engagement"],
    rating: 5.0,
    reviewCount: 43,
  },
  {
    name: "Graduation Cash Bouquet",
    slug: "graduation-cash-bouquet",
    description:
      "Celebrate academic achievements with our graduation cash bouquet. Featuring school colors, cap and diploma accents, and a generous arrangement of folded currency notes, this bouquet is the perfect way to honor a graduate's hard work and dedication.",
    shortDescription:
      "A celebratory money bouquet perfect for graduation gifts.",
    price: 175,
    category: "bouquets" as const,
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 18,
    tags: ["graduation", "celebration", "custom"],
    rating: 4.8,
    reviewCount: 52,
  },
  {
    name: "Anniversary Cash Bouquet",
    slug: "anniversary-cash-bouquet",
    description:
      "Mark special milestones with our anniversary cash bouquet. Romantic rose accents, heart-shaped currency folds, and luxurious gold detailing come together in a personalized arrangement that speaks volumes about your love and appreciation.",
    shortDescription:
      "A personalized arrangement made for special milestones.",
    price: 200,
    category: "bouquets" as const,
    images: [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 12,
    tags: ["anniversary", "romantic", "milestone"],
    rating: 4.9,
    reviewCount: 38,
  },
  {
    name: "Luxury Premium Bouquet",
    slug: "luxury-premium-bouquet",
    description:
      "Our most extravagant creation. The Luxury Premium Bouquet features an opulent arrangement of currency notes in multiple denominations, premium silk flowers, crystal embellishments, and a bespoke presentation box. Ideal for VIP gifts, major celebrations, and those who demand nothing but the finest.",
    shortDescription:
      "A grand custom arrangement featuring premium decorations and currency notes.",
    price: 500,
    compareAtPrice: 600,
    category: "bouquets" as const,
    images: [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    ],
    featured: true,
    inStock: true,
    inventory: 8,
    tags: ["luxury", "premium", "vip"],
    rating: 5.0,
    reviewCount: 29,
  },
];

export const seedCategories = [
  { name: "Cookies", slug: "cookies", description: "Handcrafted gourmet cookies baked fresh daily" },
  { name: "Cash Bouquets", slug: "bouquets", description: "Custom currency bouquets for every occasion" },
];

export const seedTestimonials = [
  {
    name: "Sarah Mitchell",
    occasion: "Wedding Gift",
    rating: 5,
    comment:
      "The wedding cash bouquet was absolutely stunning! Every guest asked where we got it. The attention to detail and elegant presentation exceeded all expectations.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    featured: true,
  },
  {
    name: "James Chen",
    occasion: "Birthday Surprise",
    rating: 5,
    comment:
      "Ordered the Nutella stuffed cookies for my wife's birthday along with a birthday cash bouquet. Both were incredible. She was speechless!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    featured: true,
  },
  {
    name: "Emily Rodriguez",
    occasion: "Graduation",
    rating: 5,
    comment:
      "The graduation bouquet was the highlight of the party. Beautifully crafted with school colors and so creative. Worth every penny.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    featured: true,
  },
  {
    name: "Michael Thompson",
    occasion: "Corporate Gift",
    rating: 4,
    comment:
      "We ordered assorted cookie boxes for our clients. The packaging was luxurious and the cookies were devoured within minutes. Will order again!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    featured: false,
  },
  {
    name: "Aisha Patel",
    occasion: "Anniversary",
    rating: 5,
    comment:
      "The anniversary bouquet was romantic and elegant. My husband was so touched. Velora Gifts truly understands how to make moments special.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    featured: true,
  },
  {
    name: "David Kim",
    occasion: "Cookie Lover",
    rating: 5,
    comment:
      "Best cookies I've ever had. The red velvet cookies are divine — soft, flavorful, and beautifully packaged. A true luxury experience.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    featured: false,
  },
];

export const seedGallery = [
  { title: "Chocolate Chip Perfection", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80", category: "cookies" as const, featured: true },
  { title: "Double Chocolate Indulgence", image: "https://images.unsplash.com/photo-1558961363-fa8ccf804f58?w=600&q=80", category: "cookies" as const, featured: true },
  { title: "Luxury Cookie Gift Box", image: "https://images.unsplash.com/photo-1548365328-8967dc22c2e2?w=600&q=80", category: "cookies" as const, featured: true },
  { title: "Nutella Stuffed Delight", image: "https://images.unsplash.com/photo-1607920590193-d0fae2c4a6c4?w=600&q=80", category: "cookies" as const, featured: false },
  { title: "Birthday Celebration Bouquet", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80", category: "bouquets" as const, featured: true },
  { title: "Elegant Wedding Arrangement", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", category: "bouquets" as const, featured: true },
  { title: "Graduation Gift Bouquet", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", category: "bouquets" as const, featured: true },
  { title: "Anniversary Special", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80", category: "bouquets" as const, featured: false },
  { title: "Corporate Event Display", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", category: "events" as const, featured: true },
  { title: "Happy Customer Order", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80", category: "customers" as const, featured: true },
  { title: "Red Velvet Collection", image: "https://images.unsplash.com/photo-1613478220435-7057bf053118?w=600&q=80", category: "cookies" as const, featured: false },
  { title: "Premium Luxury Bouquet", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80", category: "bouquets" as const, featured: true },
];

export const seedHomepage = {
  heroTitle: "Handcrafted Cookies & Custom Cash Bouquets",
  heroSubtitle: "Thoughtfully crafted gifts for every celebration.",
  heroImage: "https://images.unsplash.com/photo-1548365328-8967dc22c2e2?w=1920&q=80",
  aboutSnippet:
    "At Velora Gifts, we believe every celebration deserves something extraordinary. From artisan cookies baked with love to stunning cash bouquets that leave lasting impressions.",
  newsletterTitle: "Join Our Exclusive Circle",
  newsletterSubtitle: "Be the first to know about new flavors, seasonal bouquets, and special offers.",
};
