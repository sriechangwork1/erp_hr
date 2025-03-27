import { useFirebase, useFirebaseActions } from '@crema/services/auth/firebase/FirebaseAuthProvider';
import { getUserFromFirebase } from '@crema/helpers/AuthHelper';
import { useSession } from 'next-auth/react';


export const useAuthUser = () => {
  const { data: session, status } = useSession();

  const rawUser = session?.user ?? null;
  const resourceAccess = (session as any)?.resource_access || (session as any)?.access_token?.resource_access;

  // รวมข้อมูล user แบบ custom
  const user = rawUser
    ? {
        ...rawUser,
        displayName: rawUser.name,
        roles: resourceAccess ?? {},
      }
    : null;

  return {
    user,
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