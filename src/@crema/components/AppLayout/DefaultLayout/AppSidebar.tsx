import React from 'react';
import Drawer from '@mui/material/Drawer';
import clsx from 'clsx';
import AppScrollbar from '../../AppScrollbar';
import VerticalNav from '../components/VerticalNav';
import MainSidebar from '../components/MainSidebar';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import UserInfo from '../components/UserInfo';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import { RouterConfigData } from '@crema/types/models/Apps';
import { Box, Theme } from '@mui/material';

type AppSidebarProps = {
  position?: 'left' | 'top' | 'right' | 'bottom';
  variant?: string;
  routesConfig: RouterConfigData[];
  isNavCollapsed: boolean;
  toggleNavCollapsed: () => void;
};

const AppSidebar: React.FC<AppSidebarProps> = ({
  variant = '',
  position = 'left',
  toggleNavCollapsed,
  isNavCollapsed,
  routesConfig,
}) => {
  const { footer, footerType } = useLayoutContext();

  const { sidebarTextColor } = useSidebarContext();

  return (
    <>
      <Drawer
        anchor={position}
        open={isNavCollapsed}
        onClose={() => toggleNavCollapsed()}
        classes={{
          root: clsx(variant),
          paper: clsx(variant),
        }}
        sx={{ position: 'absolute', display: { lg: 'none', xs: 'block' } }}
      >
        <MainSidebar>
          <UserInfo color={sidebarTextColor} />
          <AppScrollbar
            sx={(theme: Theme) => ({
              py: 2,
              height: 'calc(100vh - 70px) !important',
              borderTop: `solid 1px ${theme.palette.divider}`,
              mt: 0.5,
            })}
          >
            <VerticalNav routesConfig={routesConfig} />
          </AppScrollbar>
        </MainSidebar>
      </Drawer>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <MainSidebar>
          <UserInfo color={sidebarTextColor} />
          <AppScrollbar
            className={clsx({
              'has-footer-fixed': footer && footerType === 'fixed',
            })}
            sx={(theme: Theme) => ({
              py: 2,
              height: 'calc(100vh - 70px) !important',
              borderTop: `solid 1px ${theme.palette.divider}`,
              mt: 0.5,
              '&.has-footer-fixed': {
                height: {
                  xs: 'calc(100vh - 117px) !important',
                  xl: 'calc(100vh - 127px) !important',
                },
              },
            })}
          >
            <VerticalNav routesConfig={routesConfig} />
          </AppScrollbar>
        </MainSidebar>
      </Box>
    </>
  );
};

export default AppSidebar;
