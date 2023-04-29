import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/auth/:path((?!verification).*)',
    '/user/:path*',
    '/upload/:path*',
  ],
};

export default async function middleware(req: NextRequest) {
  const user = req.cookies.get('user.info');
  const { url } = req;
  const { pathname } = new URL(url);

  const isUser = !!JSON.parse(user?.value || 'null');
  const onlyGuests = pathname.startsWith('/auth');
  const onlyUsers = ['user', 'upload'].includes(pathname.split('/')[1]);

  if (isUser && onlyGuests) {
    return NextResponse.redirect(new URL('/browse/featured', url));
  }

  if (!isUser && onlyUsers) {
    return NextResponse.redirect(new URL('/auth/signin', url));
  }
}
