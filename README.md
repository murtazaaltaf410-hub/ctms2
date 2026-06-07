# Velora Gifts

A premium, production-ready luxury boutique website for handcrafted gourmet cookies and custom cash bouquets.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**
- **MongoDB** + **Mongoose**
- **NextAuth.js** (Credentials)
- **next-themes** (Dark Mode)

## Features

### Public Website
- Full-screen hero with animations
- Featured products (cookies & cash bouquets)
- Dynamic products page with search, filters, and sorting
- Product detail pages with gallery, reviews, wishlist, and share
- Custom bouquet order form with image upload and delivery date picker
- Masonry gallery with lightbox
- Testimonials page
- Contact page with WhatsApp, Instagram, map, and FAQ
- Wishlist & recently viewed products
- Newsletter subscription
- Dark mode toggle
- SEO: metadata, Open Graph, JSON-LD, sitemap, robots.txt

### Admin Dashboard (`/admin`)
- Secure admin authentication
- Product CRUD with inventory management
- Order & custom order management
- Testimonials management
- Gallery management
- Homepage content editor
- Contact messages inbox
- Analytics overview

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the values:

```env
MONGODB_URI=mongodb://localhost:27017/velora-gifts
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-in-production
ADMIN_EMAIL=admin@veloragifts.com
ADMIN_PASSWORD=admin123
```

### 3. Seed the database

```bash
npm run seed
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin login:** [http://localhost:3000/login](http://localhost:3000/login)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/               # REST API endpoints
│   ├── admin/             # Admin dashboard
│   ├── products/          # Product listing & detail
│   ├── about/             # About page
│   ├── custom-order/      # Custom bouquet form
│   ├── gallery/           # Photo gallery
│   ├── testimonials/      # Customer reviews
│   ├── contact/           # Contact & FAQ
│   └── wishlist/          # Saved products
├── components/            # React components
│   ├── admin/             # Admin UI
│   ├── home/              # Homepage sections
│   ├── layout/            # Navbar, Footer
│   ├── products/          # Product cards & detail
│   ├── shared/            # Reusable utilities
│   └── ui/                # Base UI components
├── context/               # React context (wishlist, recently viewed)
├── lib/                   # Utilities, auth, seed data
├── models/                # Mongoose schemas
└── types/                 # TypeScript types
```

## Database Collections

| Collection        | Purpose                          |
|-------------------|----------------------------------|
| Users             | Admin & user accounts            |
| Products          | Cookie & bouquet catalog         |
| Categories        | Product categories               |
| Orders            | Standard product orders          |
| CustomOrders      | Custom bouquet requests          |
| Testimonials      | Customer reviews                 |
| GalleryImages     | Gallery photos                   |
| ContactMessages   | Contact form submissions         |
| Reviews           | Product reviews                  |
| HomepageContent   | Editable homepage content        |

## Color Palette

| Color          | Hex       |
|----------------|-----------|
| Cream          | `#FFF8F0` |
| Warm Beige     | `#EADBC8` |
| Soft Brown     | `#8B5E3C` |
| Dark Chocolate | `#3E2723` |
| Gold           | `#D4AF37` |

## Production Deployment

1. Set production environment variables
2. Use MongoDB Atlas for database
3. Generate a secure `NEXTAUTH_SECRET`: `openssl rand -base64 32`
4. Build: `npm run build`
5. Start: `npm start`

## License

Private — All rights reserved.
