'use client';
import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthUser } from '@/hooks/AuthHooks';
import AppLoader from '@crema/components/AppLoader';
import routesConfig from '@crema/core/AppRoutes/routeConfig';
import { Layouts } from '@crema/components/AppLayout';
import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import { useLayoutActionsContext, useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function RootLayout({ children }: any) {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const searchParams = useSearchParams();

  const { user, isLoading } = useAuthUser();
  const router = useRouter();
  const layout = searchParams.get('layout');
  const menuStyle = searchParams.get('menuStyle');
  const sidebarImage = searchParams.get('sidebarImage');
  const queryParams = searchParams.toString();

  useEffect(() => {
    if (!user && !isLoading) {
      // console.log({user,isLoading});
      
      signIn("keycloak");

      // window.location.href = "http://localhost:3000";
    }
  }, [user, isLoading, queryParams]);

  useEffect(() => {
    if (layout) updateNavStyle(layout);
    if (menuStyle) updateMenuStyle(menuStyle);
    if (sidebarImage) setSidebarBgImage(true);
  }, [ layout, menuStyle, sidebarImage, updateNavStyle, updateMenuStyle, setSidebarBgImage ]);

  if (!user || isLoading) return <AppLoader />;

  return <AppLayout routesConfig={routesConfig}>{children}</AppLayout>;
}
