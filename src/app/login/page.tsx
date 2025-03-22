'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  useEffect(() => {
    signIn('keycloak', {
        callbackUrl: 'http://localhost:3009/', // หรือ '/dashboard'
    });
  }, []);

  return <p>กำลังเข้าสู่ระบบ...</p>;
}
