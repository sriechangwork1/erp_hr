// 'use client';

// import { useEffect } from 'react';
// import { signIn } from 'next-auth/react';

// export default function LoginPage() {
//   useEffect(() => {
//     signIn('keycloak', {
//         callbackUrl: 'http://localhost:3009/', // หรือ '/dashboard'
//     });
//   }, []);

//   return <p>กำลังเข้าสู่ระบบ...</p>;
// }

'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthMethod } from '@crema/hooks/AuthHooks';

export default function TokenLoginPage() {
  const router = useRouter();
  const token = useSearchParams().get('token');
  const { loginWithToken } = useAuthMethod();

  useEffect(() => {
    if (!token) {
      router.push('/login?error=missing_token');
      return;
    }

    loginWithToken(token);
  }, [token]);

  return <p>🔐 กำลังเข้าสู่ระบบ HR...</p>;
}
