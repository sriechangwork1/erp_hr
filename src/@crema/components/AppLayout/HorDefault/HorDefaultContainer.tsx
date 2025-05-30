import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import AppScrollbar from '@crema/components/AppScrollbar';

type HorDefaultContainerProps = {
  children: ReactNode;

  [x: string]: any;
};

const HorDefaultContainer: React.FC<HorDefaultContainerProps> = ({ children, ...rest }) => {
  return (
    <Box
      sx={(theme) => ({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        '&.boxedLayout': {
          maxWidth: { xl: 1480 },
          mx: { xl: 'auto' },
          boxShadow: 'none',
          borderLeft: '1px solid #e8e5dd',
          borderRight: '1px solid #e8e5dd',
          pt: { xl: 0 },
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
          '& .horDefaultWrapper': {
            borderRadius: { xl: 3 },
          },
          '& .app-bar': {
            borderTopLeftRadius: { xl: 12 },
            borderTopRightRadius: { xl: 12 },
            overflow: 'hidden',
          },
          '& .footer': {
            borderBottomLeftRadius: { xl: 12 },
            borderBottomRightRadius: { xl: 12 },
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

export default HorDefaultContainer;
