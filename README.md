# 💒 Wedify - Wedding Invitation Platform

Wedify is a modern, full-featured wedding invitation platform built with Next.js 14+. Create beautiful wedding invitations, manage your guest list, track RSVPs, and share via custom subdomains.

## ✨ Features

- 🎨 **Beautiful Templates** - Choose from multiple stunning, customizable templates
- 👥 **Guest Management** - Easy CRUD operations for managing wedding guests
- 📧 **Multi-Channel Invites** - Send invitations via Email, WhatsApp, or SMS
- 📊 **RSVP Tracking** - Real-time RSVP tracking with analytics dashboard
- 🔗 **Custom Subdomains** - Each couple gets their own subdomain (e.g., `john-and-jane.wedify.lk`)
- 📱 **QR Codes** - Generate unique QR codes for each guest
- 🎯 **Personalized Links** - Individual invitation links for each guest
- 📈 **Analytics Dashboard** - Track invitation views and RSVP statistics
- 🌐 **SEO Optimized** - Dynamic metadata for better search visibility
- 📱 **Fully Responsive** - Beautiful on all devices

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Lucide icons
- **Forms:** React Hook Form + Zod validation
- **State Management:** Zustand
- **Authentication:** NextAuth.js
- **HTTP Client:** Axios
- **Data Fetching:** SWR
- **Animations:** Framer Motion

## 📁 Project Structure

```
wedify-frontend/
├── app/
│   ├── (marketing)/          # Public marketing pages
│   │   ├── page.tsx          # Landing page
│   │   ├── about/
│   │   ├── pricing/
│   │   └── contact/
│   ├── (dashboard)/dashboard/ # User dashboard (protected)
│   │   ├── layout.tsx        # Dashboard layout with sidebar
│   │   ├── page.tsx          # Dashboard overview
│   │   ├── guests/           # Guest management
│   │   ├── invites/          # Send invitations
│   │   ├── templates/        # Template selection
│   │   └── settings/         # Wedding & account settings
│   ├── [subdomain]/          # Dynamic subdomain routes
│   │   ├── page.tsx          # Public wedding page
│   │   └── invite/[code]/    # Personalized guest invites
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth endpoints
│   │   ├── rsvp/             # RSVP handling
│   │   ├── wedding/          # Wedding CRUD
│   │   ├── guests/           # Guest management
│   │   └── revalidate/       # ISR revalidation
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── Modal.tsx
│   │   └── Toast.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── InviteCard.tsx
│   ├── RSVPForm.tsx
│   └── TemplatePreview.tsx
├── lib/
│   ├── api.ts               # Axios instance & helpers
│   ├── auth.ts              # Auth utilities
│   ├── fetcher.ts           # SWR fetcher
│   ├── constants.ts         # App constants
│   ├── utils.ts             # Utility functions
│   └── subdomain.ts         # Subdomain helpers
├── middleware.ts            # Subdomain routing middleware
└── tailwind.config.ts       # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wedify-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your configuration.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Testing Subdomains Locally

To test subdomains on your local machine:

1. Edit your hosts file:
   - **Windows:** `C:\Windows\System32\drivers\etc\hosts`
   - **Mac/Linux:** `/etc/hosts`

2. Add entries:
   ```
   127.0.0.1 localhost
   127.0.0.1 john-and-jane.localhost
   127.0.0.1 test-wedding.localhost
   ```

3. Access subdomains:
   - Main site: `http://localhost:3000`
   - Subdomain: `http://john-and-jane.localhost:3000`

## 📝 Key Features Implementation

### 1. Subdomain Routing

The `middleware.ts` handles dynamic subdomain routing:
- Detects subdomain from hostname
- Rewrites to `/[subdomain]` route
- Preserves query parameters and headers

### 2. Guest Management

Dashboard includes full CRUD operations:
- Add/Edit/Delete guests
- Import bulk guests
- Filter by category
- Search functionality

### 3. Invitation Sending

Multiple delivery methods:
- Email invitations
- WhatsApp messages
- Unique QR codes
- Shareable links

### 4. RSVP System

Guests can:
- Accept or decline invitation
- Specify number of guests
- Leave a message
- View wedding details

### 5. Templates

5 beautiful pre-designed templates:
- Elegant Rose
- Modern Minimal
- Rustic Charm
- Tropical Paradise
- Vintage Classic

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available configuration options.

### Tailwind Customization

Edit `tailwind.config.ts` to customize:
- Color schemes
- Fonts
- Animations
- Breakpoints

### Adding New Templates

1. Add template config to `lib/constants.ts`:
   ```typescript
   {
     id: "new-template",
     name: "New Template",
     description: "Description",
     colors: { primary: "#xxx", secondary: "#yyy", accent: "#zzz" }
   }
   ```

2. Create template assets in `public/templates/`

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Set up custom domain with wildcard DNS:
   ```
   A     @           76.76.21.21
   CNAME *           cname.vercel-dns.com
   ```
5. Deploy!

### Other Platforms

- Ensure Node.js 18+ support
- Configure wildcard subdomain support
- Set environment variables
- Build: `npm run build`
- Start: `npm start`

## 📚 API Routes

### Wedding Management
- `GET /api/wedding?subdomain=xxx` - Get wedding by subdomain
- `POST /api/wedding` - Create wedding
- `PUT /api/wedding` - Update wedding

### Guest Management
- `GET /api/guests?weddingId=xxx` - Get all guests
- `POST /api/guests` - Add guest
- `PUT /api/guests` - Update guest
- `DELETE /api/guests?id=xxx` - Delete guest

### RSVP
- `POST /api/rsvp` - Submit RSVP
- `GET /api/rsvp?weddingId=xxx` - Get RSVPs

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out

## 🎨 Customization

### Colors

Modify primary and secondary colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    50: '#fdf4f5',
    // ... other shades
    600: '#d04061',
  }
}
```

### Fonts

Update font imports in `app/layout.tsx` and configure in `tailwind.config.ts`.

## 🐛 Troubleshooting

### Subdomain not working locally
- Check hosts file configuration
- Clear browser cache
- Restart dev server

### API routes returning 404
- Ensure you're using `/api/` prefix
- Check route file names match URL structure

### Styling issues
- Run `npm run build` to check for CSS errors
- Verify Tailwind config is correct

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 💬 Support

For support, email support@wedify.lk or open an issue on GitHub.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Open source community

---

Made with ❤️ using Wedify
