'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
//import jwtDecode from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken {
    name: string;
    email: string;
    resource_access?: {
      [key: string]: {
        roles: string[];
      };
    };
    [key: string]: any;
  }
  
export default function TokenLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  useEffect(() => {
    if (!token) {
      router.push('/login?error=missing_token');
      return;
    }

    try {
      //console.log(jwt.decode(token));
      //const decoded: DecodedToken = jwtDecode(token); // ✅ ตรงนี้จะไม่พัง
      const decoded: DecodedToken = jwt.decode(token); // ✅ ตรงนี้จะไม่พัง
      console.log('✅ Token Decoded:', decoded);

      // เก็บ user ลง localStorage
    //   localStorage.setItem(`${systemKey}_user`, JSON.stringify({
    //     name: decoded.name,
    //     email: decoded.email,
    //     roles: decoded.resource_access?.erp_hr?.roles || [],
    //     token,
    //   }));

    const systemKey = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!; // เปลี่ยนค่านี้ตามระบบ เช่น 'erp_budget', 'erp_account', etc.
    sessionStorage.setItem(`${systemKey}_user`, JSON.stringify({
        name: decoded.name,
        email: decoded.email,
        roles: decoded.resource_access?.[systemKey]?.roles || [],
        token,
    }));

      router.push('/');
    } catch (err) {
      console.error('❌ Token invalid', err);
      router.push('/login?error=invalid_token');
    }
  }, [token]);

  return <p>🔐 กำลังเข้าสู่ระบบ HR...</p>;
}