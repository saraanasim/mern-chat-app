import { NextRequest, NextResponse } from 'next/server';
import { getAbsolutePath } from './utils/helpers';
import { AuthApi } from './lib/api/auth.api';

const protectedRoutes = ['/']

export default async function middleware(req: NextRequest) {
  const currentRoute = req.nextUrl.pathname;
  const shouldProtect = protectedRoutes.includes(currentRoute)
  const authCookie = req.cookies.get('auth')
  if (shouldProtect) {
    if (!authCookie) return NextResponse.redirect(getAbsolutePath('/login'))
    const validatedUser = await AuthApi.validUser()

    if (!validatedUser?.token) return NextResponse.redirect(getAbsolutePath('/login'))
  }

}
//This middleware will only run for protected routes
export const config = {
  matcher: ['/']
};
