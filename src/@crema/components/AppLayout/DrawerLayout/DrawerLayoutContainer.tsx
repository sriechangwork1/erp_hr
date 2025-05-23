import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import AppScrollbar from '@crema/components/AppScrollbar';

type DrawerLayoutContainerProps = {
  children: ReactNode;

  [x: string]: any;
};

const DrawerLayoutContainer: React.FC<DrawerLayoutContainerProps> = ({ children, ...rest }) => {
  return (
    <Box
      sx={(theme) => ({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        '&.boxedLayout': {
          maxWidth: { xl: 1480 },
          mx: { xl: 'auto' },
          boxShadow: 'none',
          borderLeft: '1px solid #e8e5dd',
          borderRight: '1px solid #e8e5dd',
          '& .appMainFixedHeader': {
            pt: { xl: 0 },
            '& .app-bar': {
              position: { xl: 'sticky' },
            },
          },
          '& .mainContent': {
            position: { xl: 'static' },
          },
          '& .fixed-footer': {
            position: { xl: 'sticky' },
          },
          '& .appMainFixedFooter': {
            pb: { xl: 0 },
          },
        },
        '&.framedLayout': {
          padding: { xl: 5 },
          backgroundColor: theme.palette.primary.main,
          '& .drawerLayoutWrapper': {
            borderRadius: { xl: 3 },
          },
          '& .app-bar': {
            borderTopLeftRadius: { xl: 12 },
            borderTopRightRadius: { xl: 12 },
          },
          '& .footer': {
            borderBottomLeftRadius: { xl: 12 },
            borderBottomRightRadius: { xl: 12 },
          },
          '& .appMainFixedHeader': {
            pt: { xl: 0 },
            '& .app-bar': {
              position: { xl: 'sticky' },
            },
          },
          '& .mainContent': {
            position: { xl: 'static' },
          },
          '& .fixed-footer': {
            position: { xl: 'sticky' },
          },
          '& .appMainFixedFooter': {
            pb: { xl: 0 },
          },
        },
      })}
      {...rest}
    >
      <AppScrollbar sx={{ maxHeight: '100vh' }}>{children}</AppScrollbar>
    </Box>
  );
};

export default DrawerLayoutContainer;
