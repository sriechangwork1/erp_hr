import React from 'react';
import SignIn from '../../../modules/auth/Signin';

const Page = () => {
  return <SignIn />;
};

export default Page;


// 'use client';

// import { useEffect } from 'react';
// import { signIn } from 'next-auth/react';

// export default function LoginPage() {
//   useEffect(() => {
//     signIn('keycloak', {
//       //callbackUrl: 'http://localhost:3009/', // หรือ '/dashboard'
//     });
//   }, []);

//   return <p>กำลังเข้าสู่ระบบ...</p>;
// }
