import { MAIN_DOMAIN, WWW_DOMAIN } from "./constants";

/**
 * Extract subdomain from hostname
 * Example: "janith-and-sanduni.wedify.lk" -> "janith-and-sanduni"
 */
export function getSubdomain(hostname: string): string | null {
  // Remove port if present
  const host = hostname.split(":")[0];
  
  // Check if it's the main domain or www
  if (host === MAIN_DOMAIN || host === WWW_DOMAIN || host === "localhost") {
    return null;
  }
  
  // Extract subdomain
  const parts = host.split(".");
  
  // If it's a subdomain of our main domain
  if (host.endsWith(`.${MAIN_DOMAIN}`)) {
    return parts[0];
  }
  
  return null;
}

/**
 * Check if request is from main domain (not subdomain)
 */
export function isMainDomain(hostname: string): boolean {
  const host = hostname.split(":")[0];
  return host === MAIN_DOMAIN || host === WWW_DOMAIN || host === "localhost";
}

/**
 * Check if request is from subdomain
 */
export function isSubdomain(hostname: string): boolean {
  return getSubdomain(hostname) !== null;
}

/**
 * Build full URL with subdomain
 */
export function buildSubdomainUrl(subdomain: string, path: string = "/"): string {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const domain = process.env.NODE_ENV === "production" ? MAIN_DOMAIN : "localhost:3000";
  return `${protocol}://${subdomain}.${domain}${path}`;
}

/**
 * Build main domain URL
 */
export function buildMainUrl(path: string = "/"): string {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const domain = process.env.NODE_ENV === "production" ? MAIN_DOMAIN : "localhost:3000";
  return `${protocol}://${domain}${path}`;
}

/**
 * Validate subdomain format
 * - Only lowercase letters, numbers, and hyphens
 * - Must start and end with alphanumeric
 * - Length between 3 and 63 characters
 */
export function isValidSubdomain(subdomain: string): boolean {
  const subdomainRegex = /^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/;
  
  // Check format
  if (!subdomainRegex.test(subdomain)) {
    return false;
  }
  
  // Check reserved subdomains
  const reserved = [
    "www",
    "mail",
    "ftp",
    "smtp",
    "pop",
    "imap",
    "api",
    "admin",
    "dashboard",
    "app",
    "blog",
    "shop",
    "store",
    "support",
    "help",
    "docs",
    "status",
  ];
  
  if (reserved.includes(subdomain)) {
    return false;
  }
  
  return true;
}

/**
 * Generate unique subdomain suggestion
 */
export function generateSubdomainSuggestion(baseName: string): string {
  const cleaned = baseName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  
  // If it's valid, return it
  if (isValidSubdomain(cleaned)) {
    return cleaned;
  }
  
  // Otherwise, add a random suffix
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `${cleaned}-${randomSuffix}`;
}
