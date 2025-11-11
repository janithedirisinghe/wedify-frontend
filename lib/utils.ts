import { type ClassValue, clsx } from "clsx";

/**
 * Merge class names with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string, format: "full" | "short" | "time" = "full"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  
  if (format === "short") {
    return d.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  }
  
  if (format === "time") {
    return d.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit",
      hour12: true 
    });
  }
  
  return d.toLocaleDateString("en-US", { 
    weekday: "long",
    month: "long", 
    day: "numeric", 
    year: "numeric" 
  });
}

/**
 * Generate slug from string (e.g., "John & Jane" -> "john-and-jane")
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Generate subdomain from couple names
 */
export function generateSubdomain(bride: string, groom: string): string {
  const brideFirst = bride.split(" ")[0];
  const groomFirst = groom.split(" ")[0];
  return generateSlug(`${brideFirst}-and-${groomFirst}`);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}

/**
 * Format phone number for WhatsApp (remove special characters)
 */
export function formatPhoneForWhatsApp(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Generate WhatsApp invite link
 */
export function generateWhatsAppLink(phone: string, message: string): string {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Calculate days until wedding
 */
export function daysUntilWedding(weddingDate: Date | string): number {
  const wedding = typeof weddingDate === "string" ? new Date(weddingDate) : weddingDate;
  const today = new Date();
  const diffTime = wedding.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Get RSVP statistics
 */
export function getRSVPStats(rsvps: any[]) {
  const total = rsvps.length;
  const accepted = rsvps.filter((r) => r.status === "accepted").length;
  const declined = rsvps.filter((r) => r.status === "declined").length;
  const pending = total - accepted - declined;
  
  return {
    total,
    accepted,
    declined,
    pending,
    acceptanceRate: total > 0 ? ((accepted / total) * 100).toFixed(1) : "0",
  };
}
