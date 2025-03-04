import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import AppContentView from '../../AppContentView';
import AppFixedFooter from './AppFixedFooter';
import AppHeader from './AppHeader';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import AppThemeSetting from '../../AppThemeSetting';
import DrawerLayoutWrapper from './DrawerLayoutWrapper';
import MainContent from './MainContent';
import { LayoutType } from '@crema/constants/AppEnums';
import AppSidebar from './AppSidebar';
import DrawerLayoutContainer from './DrawerLayoutContainer';
import { usePathname } from 'next/navigation';
import { RouterConfigData } from '@crema/types/models/Apps';

type Props = {
  children: React.ReactNode;
  routesConfig: RouterConfigData[];
};
const DrawerLayout = ({ children, routesConfig }: Props) => {
  const { footer, layoutType, headerType, footerType } = useLayoutContext();
  const pathname = usePathname();
  const [isNavCollapsed, setNavCollapsed] = useState(false);
  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    setNavCollapsed(false);
  }, [pathname]);

  return (
    <DrawerLayoutContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <DrawerLayoutWrapper
        className={clsx('drawerLayoutWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
          appMainFixedHeader: headerType === 'fixed',
        })}
      >
        <AppSidebar
          routesConfig={routesConfig}
          isNavCollapsed={isNavCollapsed}
          toggleNavCollapsed={toggleNavCollapsed}
        />

        <MainContent>
          <AppHeader toggleNavCollapsed={toggleNavCollapsed} />
          <AppContentView>{children}</AppContentView>
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </DrawerLayoutWrapper>
    </DrawerLayoutContainer>
  );
};

export default DrawerLayout;
