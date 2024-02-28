'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Amplify } from 'aws-amplify';
import Auth, { getCurrentUser } from '@aws-amplify/auth';
// import { CognitoUser } from '@aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { awsConfig } from './aws-exports';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { AuthUserType } from '@crema/types/models/AuthUser';

type AwsCognitoContextProps = {
  user: AuthUserType | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  auth?: any;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type SignInProps = {
  username: string;
  password: string;
};

interface AwsCognitoActionsProps {
  signUpCognitoUser: (data: SignUpProps) => void;
  signIn: (data: SignInProps) => void;
  confirmCognitoUserSignup: (username: string, code: string) => void;
  forgotPassword: (username: string, code: string) => void;
  logout: () => void;
}

const AwsCognitoContext = createContext<AwsCognitoContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const AwsCognitoActionsContext = createContext<AwsCognitoActionsProps>({
  signUpCognitoUser: () => {},
  signIn: () => {},
  confirmCognitoUserSignup: () => {},
  forgotPassword: () => {},
  logout: () => {},
});
export const useAwsCognito = () => useContext(AwsCognitoContext);

export const useAwsCognitoActions = () => useContext(AwsCognitoActionsContext);

interface AwsAuthProviderProps {
  children: ReactNode;
}

const AwsAuthProvider: React.FC<AwsAuthProviderProps> = ({ children }) => {
  const [awsCognitoData, setAwsCognitoData] = useState<AwsCognitoContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const infoViewActionsContext = useInfoViewActionsContext();
  const router = useRouter();

  const auth = useMemo(() => {
    Amplify.configure(awsConfig);
    return Amplify;
  }, []);

  useEffect(() => {
    // auth
    //   .currentAuthenticatedUser()
    getCurrentUser()
      .then((user: any) =>
        setAwsCognitoData({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),
      )
      .catch(() =>
        setAwsCognitoData({
          user: undefined,
          isAuthenticated: false,
          isLoading: false,
        }),
      );
  }, [auth]);

  const signIn = async ({ username, password }: SignInProps) => {
    infoViewActionsContext.fetchStart();
    try {
      const user: any = await Auth.signIn({ username, password });

      infoViewActionsContext.fetchSuccess();
      setAwsCognitoData({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (data: any) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      infoViewActionsContext.fetchError(data?.message as string);
    }
  };
  const signUpCognitoUser = async ({ email, password, name }: SignUpProps) => {
    infoViewActionsContext.fetchStart();
    try {
      await Auth.signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            name,
          },
        },
      });
      infoViewActionsContext.fetchSuccess();
      router.push('/confirm-signup', { email: email } as any);

      infoViewActionsContext.showMessage(
        'A code has been sent to your registered email address, Enter the code to complete the signup process!',
      );
    } catch (data: any) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      infoViewActionsContext.fetchError(data?.message as string);
    }
  };
  const confirmCognitoUserSignup = async (username: string, code: string) => {
    infoViewActionsContext.fetchStart();
    try {
      await Auth.confirmSignUp({
        username,
        confirmationCode: code,
        options: {
          forceAliasCreation: false,
        },
      });
      router.push('/signin');
      infoViewActionsContext.showMessage(
        'Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!',
      );
    } catch (data: any) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      infoViewActionsContext.fetchError(data?.message as string);
    }
  };
  const forgotPassword = async (username: string, code: string) => {
    infoViewActionsContext.fetchStart();
    try {
      await Auth.confirmSignUp({
        username,
        confirmationCode: code,
        options: {
          forceAliasCreation: false,
        },
      });
      router.push('/signin');
      infoViewActionsContext.showMessage(
        'Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!',
      );
    } catch (data: any) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      infoViewActionsContext.fetchError(data?.message as string);
    }
  };

  const logout = async () => {
    setAwsCognitoData({ ...awsCognitoData, isLoading: true });
    try {
      await Auth.signOut();
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <AwsCognitoContext.Provider
      value={{
        ...awsCognitoData,
        auth,
      }}
    >
      <AwsCognitoActionsContext.Provider
        value={{
          logout,
          signIn,
          signUpCognitoUser,
          confirmCognitoUserSignup,
          forgotPassword,
        }}
      >
        {children}
      </AwsCognitoActionsContext.Provider>
    </AwsCognitoContext.Provider>
  );
};

export default AwsAuthProvider;
