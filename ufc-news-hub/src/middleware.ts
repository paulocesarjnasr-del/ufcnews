import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Paths that are publicly accessible (no admin cookie needed)
const PUBLIC_PATTERNS = [
  /^\/arena(\/|$)/,         // /arena and all sub-paths
  /^\/[a-z]{2}\/arena(\/|$)/, // /pt/arena, /en/arena, etc.
  /^\/admin(\/|$)/,         // /admin (already password-protected)
];

// Locale root paths that should redirect to arena
const LOCALE_ROOTS = new Set(['/', '/pt', '/en', '/fr', '/es']);

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATTERNS.some((pattern) => pattern.test(pathname));
}

function hasValidAdminCookie(request: NextRequest): boolean {
  const cookie = request.cookies.get('admin_token');
  if (!cookie?.value) return false;
  // Basic structure check: "timestamp.hmac" format
  const parts = cookie.value.split('.');
  if (parts.length !== 2) return false;
  const timestamp = parseInt(parts[0], 10);
  if (isNaN(timestamp)) return false;
  // Check not expired (8 hours)
  const TTL = 8 * 60 * 60 * 1000;
  return (Date.now() - timestamp) < TTL;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root paths redirect to /arena
  if (LOCALE_ROOTS.has(pathname)) {
    return NextResponse.redirect(new URL('/arena', request.url));
  }

  // Public paths: always allowed
  if (isPublicPath(pathname)) {
    return intlMiddleware(request);
  }

  // Admin cookie: allow everything (admin can browse the full site)
  if (hasValidAdminCookie(request)) {
    return intlMiddleware(request);
  }

  // Everything else: redirect to /arena
  return NextResponse.redirect(new URL('/arena', request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*|manifest\\.json|sw\\.js|icons).*)',
  ],
};
