import { useRouter } from 'next/navigation';
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

export const useAuthMethod = () => {
  const router = useRouter();

  const loginWithToken = (token: string) => {
    //const decoded: DecodedToken = jwtDecode(token);
    const decoded: DecodedToken = jwt.decode(token); // ✅ ตรงนี้จะไม่พัง
    const systemKey = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!; // เปลี่ยนค่านี้ตามระบบ เช่น 'erp_budget', 'erp_account', etc.
    const user = {
      name: decoded.name,
      email: decoded.email,
      roles: decoded.resource_access?.[systemKey]?.roles || [],
      token,
    };

    //localStorage.setItem(`${systemKey}_user`, JSON.stringify(user));
    
    sessionStorage.setItem(`${systemKey}_user`, JSON.stringify({
      name: decoded.name,
      email: decoded.email,
      roles: decoded.resource_access?.[systemKey]?.roles || [],
      token,
    }));
    router.push('/');
  };

  const logout = () => {
    const systemKey = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!; // เปลี่ยนค่านี้ตามระบบ เช่น 'erp_budget', 'erp_account', etc.
    //localStorage.removeItem(`${systemKey}_user`);
    sessionStorage.removeItem(`${systemKey}_user`);
    // พยายามปิดแท็บ
    window.open('', '_self');
    window.close();

    // ถ้าปิดไม่ได้ (เช่นเปิดจาก URL ตรง) → fallback ไปหน้าอื่น
    setTimeout(() => {
      window.location.href = process.env.NEXT_PUBLIC_MAIN_URL!;
    }, 100);
  };

  return {
    loginWithToken,
    logout,
  };
};
