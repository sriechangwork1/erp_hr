import { useFirebase, useFirebaseActions } from '@crema/services/auth/firebase/FirebaseAuthProvider';
import { getUserFromFirebase } from '@crema/helpers/AuthHelper';
import { useSession } from 'next-auth/react';


export const useAuthUser = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user ?? null,
    isLoading: status === 'loading',
  };
};


export const useAuthMethod = () => {
  const { logInWithEmailAndPassword, registerUserWithEmailAndPassword, logInWithPopup, logout } = useFirebaseActions();

  return {
    logInWithEmailAndPassword,
    registerUserWithEmailAndPassword,
    logInWithPopup,
    logout,
  };
};

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// //import jwtDecode from 'jwt-decode';
// import jwtDecode from 'jwt-decode';
// import jwt, { JwtPayload } from 'jsonwebtoken';


// interface DecodedToken {
//   name: string;
//   email: string;
//   resource_access?: {
//     [key: string]: {
//       roles: string[];
//     };
//   };
//   [key: string]: any;
// }

// interface UserType {
//   name: string;
//   email: string;
//   roles: string[];
//   token: string;
// }

// // ✅ ใช้สำหรับดึงข้อมูลผู้ใช้จาก localStorage
// export const useAuthUser = () => {
//   const [user, setUser] = useState<UserType | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     //const storedUser = localStorage.getItem(`${systemKey}_user`);
//     const systemKey = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!; // เปลี่ยนค่านี้ตามระบบ เช่น 'erp_budget', 'erp_account', etc.
//     const storedUser = sessionStorage.getItem(`${systemKey}_user`);

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   return {
//     user,
//     isLoading,
//     isAuthenticated: !!user,
//   };
// };

// // ✅ ใช้สำหรับ login ด้วย token และ logout
// export const useAuthMethod = () => {
//   const router = useRouter();

//   const loginWithToken = (token: string) => {
//     //const decoded: DecodedToken = jwtDecode(token);
//     const decoded: DecodedToken = jwt.decode(token); // ✅ ตรงนี้จะไม่พัง
//     console.log('✅ Token Decoded:', decoded);

//     const systemKey = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!; // เปลี่ยนค่านี้ตามระบบ เช่น 'erp_budget', 'erp_account', etc.
//     const user: UserType = {
//       name: decoded.name,
//       email: decoded.email,
//       roles: decoded.resource_access?.[systemKey]?.roles || [],
//       token,
//     };

//     //localStorage.setItem(`${systemKey}_user`, JSON.stringify(user));
//     sessionStorage.setItem(`${systemKey}_user`, JSON.stringify({
//         name: decoded.name,
//         email: decoded.email,
//         roles: decoded.resource_access?.[systemKey]?.roles || [],
//         token,
//     }));
//     // ✅ Redirect ไปหน้าแรกหลัง login
//     router.push('/');
//   };

//   const logout = () => {
//     const systemKey = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!; // เปลี่ยนค่านี้ตามระบบ เช่น 'erp_budget', 'erp_account', etc.
//    //localStorage.removeItem(`${systemKey}_user`);
//     sessionStorage.removeItem(`${systemKey}_user`);
//     // พยายามปิดแท็บ
//     window.open('', '_self');
//     window.close();

//     // ถ้าปิดไม่ได้ (เช่นเปิดจาก URL ตรง) → fallback ไปหน้าอื่น
//     setTimeout(() => {
//       window.location.href = process.env.NEXT_PUBLIC_MAIN_URL!;
//     }, 100);
//   };

//   return {
//     loginWithToken,
//     logout,
//   };
// };

