// app/api/auth/token-login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const KEYCLOAK_PUBLIC_KEY = process.env.KEYCLOAK_PUBLIC_KEY!; // ใช้ public key จาก Keycloak

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=missing_token', req.url));
  }

  try {
    const decoded = jwt.verify(token, KEYCLOAK_PUBLIC_KEY, {
      algorithms: ['RS256'],
    });

    // เก็บข้อมูล user ที่จำเป็นใน cookie หรือ session
    const res = NextResponse.redirect(new URL('/', req.url));
    res.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 10,
      path: '/',
    });

    return res;
  } catch (err) {
    console.error('Token verification failed', err);
    return NextResponse.redirect(new URL('/login?error=invalid_token', req.url));
  }
}
