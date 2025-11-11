# NestJS Backend Integration Guide

## Overview

The Wedify frontend is configured to connect to a NestJS backend API. All authentication, data management, and business logic will be handled by your NestJS server.

## Backend API Configuration

### Environment Variables

Set your NestJS backend URL in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### API Base URL

The frontend Axios instance is configured in `lib/api.ts`:
- Default URL: `http://localhost:4000/api`
- Includes credentials for cookie-based auth
- 10-second timeout
- Automatic auth token injection

## Required NestJS Backend Endpoints

Your NestJS backend should implement the following API endpoints:

### 1. Authentication (`/api/auth`)

```typescript
POST   /api/auth/register      // User registration
POST   /api/auth/login         // User login
POST   /api/auth/logout        // User logout
GET    /api/auth/me            // Get current user
POST   /api/auth/refresh       // Refresh JWT token (optional)
```

**Request/Response Examples:**

```typescript
// POST /api/auth/register
Request: {
  email: string;
  password: string;
  name: string;
}
Response: {
  user: User;
  accessToken?: string; // If using JWT
}

// POST /api/auth/login
Request: {
  email: string;
  password: string;
}
Response: {
  user: User;
  accessToken?: string; // If using JWT
}

// GET /api/auth/me
Response: User | null
```

### 2. Wedding Management (`/api/wedding`)

```typescript
GET    /api/wedding/:subdomain     // Get wedding by subdomain
POST   /api/wedding               // Create wedding
PUT    /api/wedding/:id           // Update wedding
DELETE /api/wedding/:id           // Delete wedding
```

**Data Models:**

```typescript
interface Wedding {
  id: string;
  subdomain: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venue: string;
  venueAddress?: string;
  message?: string;
  template: string;
  imageUrl?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. Guest Management (`/api/guests`)

```typescript
GET    /api/guests/:weddingId     // Get all guests for a wedding
GET    /api/guest/:id             // Get single guest
POST   /api/guest                 // Create guest
PUT    /api/guest/:id             // Update guest
DELETE /api/guest/:id             // Delete guest
POST   /api/guests/:weddingId/bulk // Bulk import guests
```

**Data Models:**

```typescript
interface Guest {
  id: string;
  name: string;
  email?: string;
  phone: string;
  category?: string;
  guestCount: number;
  weddingId: string;
  inviteSent: boolean;
  inviteMethod?: 'email' | 'whatsapp' | 'sms';
  sentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4. RSVP Management (`/api/rsvp`)

```typescript
POST   /api/rsvp                  // Submit RSVP
GET    /api/rsvp/:weddingId       // Get all RSVPs for a wedding
PUT    /api/rsvp/:id              // Update RSVP
```

**Data Models:**

```typescript
interface RSVP {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: 'accepted' | 'declined' | 'pending';
  message?: string;
  guestCount: number;
  weddingId: string;
  guestCode?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 5. Template Management (`/api/templates`)

```typescript
GET    /api/templates             // Get all templates
GET    /api/template/:id          // Get single template
PUT    /api/wedding/:id/template  // Update wedding template
```

### 6. Invitation Management (`/api/invite`)

```typescript
POST   /api/invite/generate       // Generate unique invite link
POST   /api/invite/qr             // Generate QR code
POST   /api/invite/send           // Send single invitation
POST   /api/invite/bulk-send      // Send bulk invitations
```

### 7. Analytics (`/api/analytics`)

```typescript
GET    /api/analytics/:weddingId  // Get wedding analytics
```

## Authentication Strategy

### Option 1: JWT Tokens (Recommended)

```typescript
// NestJS sends JWT token on login
Response: {
  user: User,
  accessToken: string,
  refreshToken?: string
}

// Frontend stores token and sends with requests
Authorization: Bearer <accessToken>
```

**Implementation in `lib/api.ts`:**
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Option 2: Session Cookies

```typescript
// NestJS sets httpOnly cookie
Set-Cookie: session=<sessionId>; HttpOnly; Secure

// Frontend automatically sends cookie with requests
// No token management needed
```

## CORS Configuration

Your NestJS backend must allow requests from the frontend:

```typescript
// main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});
```

## Error Handling

The frontend expects standardized error responses:

```typescript
// Error format
{
  statusCode: number;
  message: string;
  error?: string;
}
```

## Frontend API Helpers

The frontend provides helper functions in `lib/api.ts`:

```typescript
import { apiHelpers } from '@/lib/api';

// Wedding operations
await apiHelpers.getWedding('subdomain');
await apiHelpers.createWedding(data);
await apiHelpers.updateWedding(id, data);

// Guest operations
await apiHelpers.getGuests(weddingId);
await apiHelpers.createGuest(data);
await apiHelpers.updateGuest(id, data);
await apiHelpers.deleteGuest(id);

// RSVP operations
await apiHelpers.submitRSVP(data);
await apiHelpers.getRSVPs(weddingId);

// Invitation operations
await apiHelpers.sendInvitation({ guestId, method: 'email' });
await apiHelpers.bulkSendInvitations(weddingId, 'whatsapp');
```

## NestJS Project Structure (Suggested)

```
nestjs-backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── guards/
│   ├── wedding/
│   │   ├── wedding.controller.ts
│   │   ├── wedding.service.ts
│   │   └── wedding.module.ts
│   ├── guest/
│   │   ├── guest.controller.ts
│   │   ├── guest.service.ts
│   │   └── guest.module.ts
│   ├── rsvp/
│   │   ├── rsvp.controller.ts
│   │   ├── rsvp.service.ts
│   │   └── rsvp.module.ts
│   ├── invitation/
│   │   ├── invitation.controller.ts
│   │   ├── invitation.service.ts
│   │   └── invitation.module.ts
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   └── interceptors/
│   └── main.ts
└── package.json
```

## Testing the Integration

### 1. Start Your NestJS Backend

```bash
cd nestjs-backend
npm run start:dev
```

Backend should run on `http://localhost:4000`

### 2. Start the Frontend

```bash
cd wedify-frontend
npm run dev
```

Frontend runs on `http://localhost:3000`

### 3. Test API Connectivity

The frontend will automatically make requests to your NestJS backend when:
- Users log in/register
- Dashboard loads wedding data
- Guests are added/edited
- RSVPs are submitted
- Invitations are sent

## Database Setup (in NestJS)

Your NestJS backend should handle:
- Database connection (PostgreSQL/MySQL/MongoDB)
- ORM setup (TypeORM/Prisma/Mongoose)
- Data validation
- Migrations
- Seeding

## Additional Services to Implement in NestJS

1. **Email Service** (for invitations)
   - Resend, SendGrid, or AWS SES
   - Email templates

2. **WhatsApp Service** (for WhatsApp invitations)
   - Twilio API or WhatsApp Business API

3. **Storage Service** (for image uploads)
   - AWS S3, Cloudinary, or local storage

4. **QR Code Service** (for generating QR codes)
   - qrcode or similar library

## Security Considerations

Your NestJS backend should implement:
- ✅ JWT authentication or session management
- ✅ Password hashing (bcrypt)
- ✅ Input validation (class-validator)
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Helmet for security headers
- ✅ SQL injection prevention
- ✅ XSS protection

## Environment Variables (NestJS Backend)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/wedify

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION=7d
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRATION=30d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
EMAIL_FROM=noreply@wedify.lk

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Storage
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=wedify-uploads
```

## Next Steps

1. ✅ Create your NestJS project
2. ✅ Set up database with TypeORM/Prisma
3. ✅ Implement authentication module
4. ✅ Implement wedding, guest, RSVP modules
5. ✅ Set up email and WhatsApp services
6. ✅ Test API endpoints with Postman
7. ✅ Connect frontend to backend
8. ✅ Deploy both applications

---

**The frontend is ready to connect to your NestJS backend!** 🚀

All API calls are configured in `lib/api.ts` and ready to use throughout the application.
