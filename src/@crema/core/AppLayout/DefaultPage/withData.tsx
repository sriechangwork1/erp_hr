import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import AppLoader from '@crema/components/AppLoader';
import { initialUrl } from '@crema/constants/AppConst';

// eslint-disable-next-line react/display-name
const withData = (ComposedComponent: any) => (props: any) => {
  const router = useRouter();
  const { user, isLoading } = useAuthUser();
  const { asPath }: any = useParams();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (user) {
      router.push(initialUrl + (queryParams ? '?' + queryParams : ''));
    }
  }, [queryParams, user]);
  if (isLoading) return <AppLoader />;
  if (user) return <AppLoader />;

  return <ComposedComponent {...props} />;
};

export default withData;
