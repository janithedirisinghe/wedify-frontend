import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl;
  
  // Get subdomain from hostname
  const host = hostname.split(":")[0];
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "wedify.lk";
  
  // Skip middleware for:
  // - Static files
  // - API routes
  // - Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }
  
  // Check if request is from main domain or subdomain
  const isMainDomain = 
    host === mainDomain || 
    host === `www.${mainDomain}` || 
    host === "localhost";
  
  // If it's the main domain, allow normal routing
  if (isMainDomain) {
    // Rewrite www to non-www in production
    if (host === `www.${mainDomain}`) {
      const url = request.nextUrl.clone();
      url.hostname = mainDomain;
      return NextResponse.redirect(url, 301);
    }
    
    return NextResponse.next();
  }
  
  // Extract subdomain
  const subdomain = host.endsWith(`.${mainDomain}`) 
    ? host.replace(`.${mainDomain}`, "") 
    : null;
  
  // If no valid subdomain, redirect to main domain
  if (!subdomain) {
    const url = request.nextUrl.clone();
    url.hostname = mainDomain;
    return NextResponse.redirect(url, 307);
  }
  
  // Rewrite to subdomain route
  // Example: janith-and-sanduni.wedify.lk/invite/abc -> /[subdomain]/invite/abc
  const url = request.nextUrl.clone();
  
  // Set subdomain as a header for use in components
  const headers = new Headers(request.headers);
  headers.set("x-subdomain", subdomain);
  
  // Rewrite the URL to the [subdomain] route
  url.pathname = `/${subdomain}${pathname}`;
  
  return NextResponse.rewrite(url, {
    request: {
      headers,
    },
  });
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};
