import React, {useEffect} from 'react';
import AuthLayout from './AuthLayout';
import {useRouter} from 'next/router';
import {useLayoutActionsContext} from '@crema/context/LayoutContextProvider';
import {useSidebarActionsContext} from '@crema/context/SidebarContextProvider';

// eslint-disable-next-line react/display-name
const withLayout = (ComposedComponent:any) => (props:any) => {
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const router = useRouter();

  useEffect(() => {
    if (router.query.layout) updateNavStyle(router.query.layout as string);
    if (router.query.menuStyle) updateMenuStyle(router.query.menuStyle as string);
    if (router.query.sidebarImage) setSidebarBgImage(true);
  }, [
    router.query.layout,
    router.query.menuStyle,
    router.query.sidebarImage,
    setSidebarBgImage,
    updateMenuStyle,
    updateNavStyle,
  ]);
  return (
    <AuthLayout>
      <ComposedComponent {...props} />
    </AuthLayout>
  );
};

export default withLayout;
