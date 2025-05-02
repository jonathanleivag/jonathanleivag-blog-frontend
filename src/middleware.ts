import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';
  const isLogin = request.nextUrl.pathname === '/login';
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isLogin) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*', '/login'],
};
