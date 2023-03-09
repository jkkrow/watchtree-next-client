import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const config = {
  matcher: [
    '/auth/:path((?!verification).*)',
    '/user/:path*',
    '/upload/:path*',
  ],
};

export default async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken');
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY!);
  const { url } = req;
  const { pathname } = new URL(url);

  if (refreshToken && pathname.startsWith('/auth')) {
    const redirectUrl = new URL('/', url);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith('/user') || pathname.startsWith('/upload')) {
    const redirectUrl = new URL('/auth', url);
    if (!refreshToken) return NextResponse.redirect(redirectUrl);

    try {
      await jwtVerify(refreshToken.value, secret);
    } catch (error) {
      return NextResponse.redirect(redirectUrl);
    }
  }
}
