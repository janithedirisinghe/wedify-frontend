// App Configuration
export const APP_NAME = "Wedify";
export const APP_DESCRIPTION = "Create beautiful wedding invitations and manage your guest list effortlessly";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://wedify.lk";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Domain Configuration
export const MAIN_DOMAIN = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "wedify.lk";
export const WWW_DOMAIN = `www.${MAIN_DOMAIN}`;

// Routes
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PRICING: "/pricing",
  CONTACT: "/contact",
  DASHBOARD: "/dashboard",
  GUESTS: "/dashboard/guests",
  INVITES: "/dashboard/invites",
  TEMPLATES: "/dashboard/templates",
  SETTINGS: "/dashboard/settings",
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
} as const;

// Wedding Templates
export const TEMPLATES = [
  {
    id: "basic",
    name: "Basic Simple",
    description: "Clean and minimal design - perfect starting point",
    thumbnail: "/templates/basic.jpg",
    colors: {
      primary: "#374151",
      secondary: "#1f2937",
      accent: "#f9fafb",
    },
    layout: "basic" as const,
  },
  {
    id: "elegant-rose",
    name: "Elegant Rose",
    description: "Classic and romantic design with rose accents",
    thumbnail: "/templates/elegant-rose.jpg",
    colors: {
      primary: "#e35d72",
      secondary: "#2d3b4c",
      accent: "#f9d5da",
    },
    layout: "elegant" as const,
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean and contemporary design",
    thumbnail: "/templates/modern-minimal.jpg",
    colors: {
      primary: "#2d3b4c",
      secondary: "#587d9c",
      accent: "#eaeef4",
    },
    layout: "modern" as const,
  },
  {
    id: "rustic-charm",
    name: "Rustic Charm",
    description: "Warm and cozy woodland theme",
    thumbnail: "/templates/rustic-charm.jpg",
    colors: {
      primary: "#8b7355",
      secondary: "#4a5d3f",
      accent: "#f5e6d3",
    },
    layout: "rustic" as const,
  },
  {
    id: "tropical-paradise",
    name: "Tropical Paradise",
    description: "Vibrant and exotic beach theme",
    thumbnail: "/templates/tropical-paradise.jpg",
    colors: {
      primary: "#ff6b9d",
      secondary: "#00b8d4",
      accent: "#fff59d",
    },
    layout: "tropical" as const,
  },
  {
    id: "vintage-classic",
    name: "Vintage Classic",
    description: "Timeless elegance with vintage flair",
    thumbnail: "/templates/vintage-classic.jpg",
    colors: {
      primary: "#a0826d",
      secondary: "#5d4037",
      accent: "#f5f5dc",
    },
    layout: "vintage" as const,
  },
] as const;

// RSVP Status
export const RSVP_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  DECLINED: "declined",
} as const;

// Guest Categories
export const GUEST_CATEGORIES = [
  "Family",
  "Friends",
  "Colleagues",
  "Relatives",
  "Neighbors",
  "Others",
] as const;

// Invitation Methods
export const INVITATION_METHODS = {
  EMAIL: "email",
  WHATSAPP: "whatsapp",
  SMS: "sms",
} as const;

// Date Formats
export const DATE_FORMATS = {
  FULL: "EEEE, MMMM d, yyyy",
  SHORT: "MMM d, yyyy",
  TIME: "h:mm a",
  DATETIME: "MMM d, yyyy 'at' h:mm a",
} as const;

// Validation Rules
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 100,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  MESSAGE_MAX_LENGTH: 500,
  VENUE_MAX_LENGTH: 200,
  PASSWORD_MIN_LENGTH: 8,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    GUEST_ADDED: "Guest added successfully!",
    GUEST_UPDATED: "Guest updated successfully!",
    GUEST_DELETED: "Guest deleted successfully!",
    INVITATION_SENT: "Invitation sent successfully!",
    RSVP_SUBMITTED: "RSVP submitted successfully!",
    SETTINGS_SAVED: "Settings saved successfully!",
    COPIED: "Copied to clipboard!",
  },
  ERROR: {
    GENERIC: "Something went wrong. Please try again.",
    NETWORK: "Network error. Please check your connection.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    VALIDATION: "Please check your input and try again.",
    NOT_FOUND: "The requested resource was not found.",
  },
} as const;

// Feature Limits (for free plan)
export const LIMITS = {
  FREE_PLAN: {
    MAX_GUESTS: 100,
    MAX_INVITES_PER_DAY: 50,
    CUSTOM_DOMAIN: false,
    TEMPLATES: 2,
  },
  PRO_PLAN: {
    MAX_GUESTS: 500,
    MAX_INVITES_PER_DAY: 200,
    CUSTOM_DOMAIN: true,
    TEMPLATES: -1, // unlimited
  },
} as const;

// Social Media
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/wedify",
  INSTAGRAM: "https://instagram.com/wedify",
  TWITTER: "https://twitter.com/wedify",
  LINKEDIN: "https://linkedin.com/company/wedify",
} as const;

// Mock Gallery Images (for template previews)
export const MOCK_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
] as const;
