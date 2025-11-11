# Wedify Frontend - Quick Start Guide

## 🎉 Project Successfully Created!

Your Wedify wedding invitation platform is ready to use!

## ✅ What's Included

### Pages Created:
1. **Landing Page** (`/(marketing)/page.tsx`)
   - Hero section with animations
   - Features showcase
   - How it works section
   - Pricing plans
   - CTA sections

2. **Dashboard** (`/dashboard/*`)
   - Overview with stats and quick actions
   - Guest management (CRUD operations)
   - Invitation sending (Email, WhatsApp, QR)
   - Template selection (5 pre-designed templates)
   - Settings (Wedding details, domain, account)

3. **Public Invitation Pages** (`/[subdomain]/*`)
   - Main wedding page with RSVP form
   - Personalized guest invitations (`/invite/[code]`)
   - Dynamic metadata for SEO

### Components:
- Header with navigation
- Footer with social links
- InviteCard for displaying wedding details
- RSVPForm with validation
- TemplatePreview for template selection
- Modal and Toast UI components

### API Routes:
- `/api/rsvp` - RSVP submission and retrieval
- `/api/wedding` - Wedding CRUD operations
- `/api/guests` - Guest management
- `/api/auth/[...nextauth]` - Authentication
- `/api/revalidate` - ISR revalidation

### Utilities:
- `lib/api.ts` - Axios instance with interceptors
- `lib/auth.ts` - NextAuth configuration
- `lib/utils.ts` - Helper functions
- `lib/constants.ts` - App-wide constants
- `lib/subdomain.ts` - Subdomain handling
- `lib/fetcher.ts` - SWR fetcher

## 🚀 How to Run

1. **Development Mode:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

2. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

## 🎨 Features

### Subdomain Routing
- Middleware handles dynamic subdomains
- Example: `john-and-jane.wedify.lk`
- Works with ISR for optimized performance

### Guest Management
- Add/Edit/Delete guests
- Category filtering
- Search functionality
- Import/Export capabilities (placeholder)

### Invitation Methods
- Email invitations
- WhatsApp messages
- Unique QR codes for each guest
- Shareable links

### RSVP System
- Accept/Decline responses
- Guest count specification
- Optional message
- Real-time tracking

### Templates
5 Beautiful templates included:
1. Elegant Rose - Classic romantic design
2. Modern Minimal - Clean contemporary look
3. Rustic Charm - Warm woodland theme
4. Tropical Paradise - Vibrant beach theme
5. Vintage Classic - Timeless elegance

## 📋 Next Steps

### 1. Set Up Environment Variables
Copy `.env.example` to `.env.local` and configure:
```bash
cp .env.example .env.local
```

Essential variables:
- `NEXTAUTH_SECRET` - For authentication
- `NEXT_PUBLIC_MAIN_DOMAIN` - Your domain
- Database connection (when you add one)

### 2. Add Database Integration
The API routes have TODO comments showing where to add database calls. Consider using:
- Prisma ORM with PostgreSQL
- Supabase
- MongoDB with Mongoose

Example Prisma schema:
```prisma
model Wedding {
  id            String   @id @default(cuid())
  subdomain     String   @unique
  brideName     String
  groomName     String
  weddingDate   DateTime
  venue         String
  guests        Guest[]
  rsvps         RSVP[]
  createdAt     DateTime @default(now())
}

model Guest {
  id          String   @id @default(cuid())
  name        String
  email       String?
  phone       String
  category    String?
  guestCount  Int      @default(1)
  weddingId   String
  wedding     Wedding  @relation(fields: [weddingId], references: [id])
  rsvp        RSVP?
  createdAt   DateTime @default(now())
}

model RSVP {
  id         String   @id @default(cuid())
  guestId    String   @unique
  guest      Guest    @relation(fields: [guestId], references: [id])
  weddingId  String
  wedding    Wedding  @relation(fields: [weddingId], references: [id])
  status     String
  message    String?
  createdAt  DateTime @default(now())
}
```

### 3. Add Email Service
Integrate an email service for sending invitations:
- Resend (recommended)
- SendGrid
- AWS SES
- Nodemailer

### 4. Add WhatsApp Integration
Options:
- Twilio WhatsApp API
- WhatsApp Business API
- Direct wa.me links (already implemented)

### 5. Add Image Upload
For wedding photos:
- AWS S3
- Cloudinary
- Vercel Blob Storage
- Uploadthing

### 6. Testing Subdomains Locally
Edit your hosts file:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`
```
127.0.0.1 localhost
127.0.0.1 test.localhost
127.0.0.1 john-and-jane.localhost
```

**Mac/Linux:** `/etc/hosts`
```
127.0.0.1 localhost
127.0.0.1 test.localhost
127.0.0.1 john-and-jane.localhost
```

Then access: `http://test.localhost:3000`

### 7. Deploy to Vercel
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Configure custom domain with wildcard DNS:
   ```
   A     @           <vercel-ip>
   CNAME *           cname.vercel-dns.com
   ```

## 🎯 Usage Examples

### Creating a Wedding
```typescript
const wedding = await apiHelpers.createWedding({
  brideName: "Jane Smith",
  groomName: "John Doe",
  weddingDate: "2025-12-15",
  weddingTime: "18:00",
  venue: "Grand Ballroom",
  subdomain: "john-and-jane",
  template: "elegant-rose"
});
```

### Adding a Guest
```typescript
const guest = await apiHelpers.createGuest({
  name: "Sarah Johnson",
  email: "sarah@example.com",
  phone: "+94712345678",
  category: "Family",
  guestCount: 2,
  weddingId: "wedding-123"
});
```

### Submitting RSVP
```typescript
const rsvp = await apiHelpers.submitRSVP({
  name: "Sarah Johnson",
  status: "accepted",
  guestCount: 2,
  message: "Looking forward to it!",
  weddingId: "wedding-123"
});
```

## 🔧 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    600: '#your-color',
    // ...
  }
}
```

### Add New Template
1. Add to `lib/constants.ts`:
```typescript
{
  id: "new-template",
  name: "New Template",
  description: "Description",
  colors: { primary: "#xxx", secondary: "#yyy", accent: "#zzz" }
}
```

2. Create template preview image in `public/templates/`

### Modify Dashboard Sidebar
Edit `app/(dashboard)/dashboard/layout.tsx` to add/remove menu items.

## 📚 Documentation

- Full README: `README.md`
- Environment Setup: `.env.example`
- API Routes: `app/api/*`
- Components: `components/*`

## 🐛 Common Issues

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`

### Subdomain Not Working
- Check middleware.ts configuration
- Verify hosts file (local)
- Check DNS settings (production)

### Styling Issues
- CSS uses PostCSS with Tailwind v4 syntax
- Custom classes defined in globals.css

## 💡 Tips

1. Use SWR for data fetching in client components
2. Server components for initial data loading
3. Implement ISR with revalidation for subdomain pages
4. Add loading states for better UX
5. Implement error boundaries
6. Add analytics (Plausible recommended)
7. Set up monitoring (Sentry, etc.)

## 📞 Support

For questions or issues:
- Check documentation
- Review code comments
- Search GitHub issues
- Contact support

---

**Happy Building! 💒✨**

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
