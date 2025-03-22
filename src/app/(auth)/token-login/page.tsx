'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import jwt_decode from 'jwt-decode';

export default function TokenLoginPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token); // ✅ คุณสามารถตรวจสอบข้อมูลใน token ได้ที่นี่

        // 👉 ทำ redirect ไปยัง API login แบบ custom หรือ save ลง local/session storage
        localStorage.setItem('token', token); // หรือส่งเข้า backend
        router.push('/'); // ไปหน้า dashboard
      } catch (e) {
        console.error('Invalid token');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [token, router]);

  return <p>กำลังเข้าสู่ระบบ...</p>;
}
