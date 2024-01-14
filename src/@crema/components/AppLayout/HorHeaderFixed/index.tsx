import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import AppContentView from '../../AppContentView';
import AppFixedFooter from './AppFixedFooter';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import AppThemeSetting from '../../AppThemeSetting';
import HorHeaderFixedWrapper from './HorHeaderFixedWrapper';
import MainContent from './MainContent';
import { LayoutType } from '@crema/constants/AppEnums';
import HorHeaderFixedContainer from './HorHeaderFixedContainer';
import { usePathname } from 'next/navigation';
import { RouterConfigData } from '@crema/types/models/Apps';

type Props = {
  children: React.ReactNode;
  routesConfig: RouterConfigData[];
};
const HorHeaderFixed = ({ children, routesConfig }: Props) => {
  const { footer, layoutType, footerType } = useLayoutContext();
  const pathname = usePathname();
  const [isNavCollapsed, setNavCollapsed] = useState(false);
  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    setNavCollapsed(false);
  }, [pathname]);

  return (
    <HorHeaderFixedContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <HorHeaderFixedWrapper
        className={clsx('horHeaderFixedWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        })}
      >
        <AppSidebar
          routesConfig={routesConfig}
          isNavCollapsed={isNavCollapsed}
          toggleNavCollapsed={toggleNavCollapsed}
        />

        <MainContent>
          <AppHeader
            toggleNavCollapsed={toggleNavCollapsed}
            routesConfig={routesConfig}
          />
          <AppContentView>{children}</AppContentView>
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </HorHeaderFixedWrapper>
    </HorHeaderFixedContainer>
  );
};

export default HorHeaderFixed;
