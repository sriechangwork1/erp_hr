import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";

interface ResourceAccess {
  [key: string]: {
      roles: string[];
  };
}
interface CustomUser extends User {
    access_token?: string;
    refresh_token?: string;
    access_token_expires?: number;
    aud?: string | string[];
    resource_access?: ResourceAccess;
    id: string;
    displayName?: string;
    photoURL?: string;
    role?: string;
}

export const useAuthUser = () => {
    
  const { data: session, status } = useSession()
  // const user = session?.user ?? null;
  // console.log({user});
  
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  let validatedUser: CustomUser | null = null; // กำหนดค่าเริ่มต้นเป็น null

  if (!isLoading && isAuthenticated && session?.user) {
    const currentUser = session.user as CustomUser; // กำหนด Type เพื่อให้เข้าถึง property ได้ง่ายขึ้น
    // console.log("useAuthUser: Raw user from session:", currentUser);

    const resourceAccess = currentUser?.resource_access;
    const resourceNames = resourceAccess ? Object.keys(resourceAccess) : [];
    
    const requiredAudience = "erp_hr"; // Audience ที่ต้องการ
    const userAudience = resourceNames;

    const isAudienceValid = userAudience
      ? (Array.isArray(userAudience) ? userAudience.includes(requiredAudience) : userAudience === requiredAudience)
      : false;

    if (isAudienceValid) validatedUser = currentUser;

  } else if (!isLoading) {
      // กรณีไม่ได้ loading แต่ไม่ authenticated หรือไม่มี session.user
      console.log("useAuthUser: User not authenticated or session/user is missing.");
  }

  return {
    isLoading,
    isAuthenticated,
    user: validatedUser,
  };
};

export const useAuthMethod = () => {

  return {
    logout: signOut,
  };
};