import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const {pathname} = request.nextUrl;

    const isLoginPage = pathname === '/login';
    const isDashboard = pathname.startsWith('/dashboard');

    if (!token && isDashboard) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/dashboard/:path*'],
};
