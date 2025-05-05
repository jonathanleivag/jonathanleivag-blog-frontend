import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {getEnv} from "@/utils/getEnv.util";
import {ENV} from "@/enum";
import {RevalidateResponse, SAMESITE} from "@/type";

export async function middleware(request: NextRequest) {
  let token = request.cookies.get('token')?.value || '';
  const isLogin = request.nextUrl.pathname === '/login';
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const res = NextResponse.next()

  try {
    const response = await fetch(`${getEnv(ENV.BACKEND_URL)}/auth/revalidate`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data: RevalidateResponse = await response.json();
    if (data.message !== undefined) {
      res.cookies.delete('token')
      token = ''
    }

    if (data.message === undefined) {
      token = data.token
      res.cookies.set('token', data.token, {
        httpOnly: false,
        secure: getEnv(ENV.NODE_ENV) === 'production',
        sameSite: getEnv(ENV.SAMESITE)  as SAMESITE,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
    }

    if (!token && isDashboard) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isLogin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return  res
  } catch (e) {
    if (e instanceof Error) {
      res.cookies.delete('token')
    }
  }
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*', '/login'],
};
