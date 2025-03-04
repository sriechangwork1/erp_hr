import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import AppScrollbar from '@crema/components/AppScrollbar';

type BitBucketContainerProps = {
  children: ReactNode;

  [x: string]: any;
};

const BitBucketContainer: React.FC<BitBucketContainerProps> = ({ children, ...rest }) => {
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
          pt: { xl: 0 },
          '& .bit-bucket-sidebar': {
            position: { xl: 'sticky' },
            left: { xl: 0 },
            top: { xl: 0 },
            height: { xl: '100%' },
            '& [data-simplebar]': {
              height: { xl: 'calc(100vh - 70px) !important' },
            },
          },
          '& .bit-bucket-sidebar-fixed': {
            position: { xl: 'relative' },
          },
          '& .app-bar': {
            position: { xl: 'sticky' },
            width: { xl: '100%' },
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
          '& .bitBucketWrapper': {
            borderRadius: { xl: 3 },
          },
          '& .bucketMinibar': {
            borderTopLeftRadius: { xl: 12 },
            borderBottomLeftRadius: { xl: 12 },
          },
          '& .bit-bucket-sidebar': {
            position: { xl: 'sticky' },
            left: { xl: 0 },
            top: { xl: 0 },
            height: { xl: '100%' },
            '& [data-simplebar]': {
              height: { xl: 'calc(100vh - 70px) !important' },
            },
          },
          '& .bit-bucket-sidebar-fixed': {
            position: { xl: 'relative' },
          },
          '& .app-bar': {
            position: { xl: 'sticky' },
            width: { xl: '100%' },
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

export default BitBucketContainer;
