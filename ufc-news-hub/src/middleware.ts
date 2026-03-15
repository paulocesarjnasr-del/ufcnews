import { NextResponse, type NextRequest } from 'next/server';

// Auth is handled at the API route level via requireAdmin()
// Middleware passes through all requests
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
