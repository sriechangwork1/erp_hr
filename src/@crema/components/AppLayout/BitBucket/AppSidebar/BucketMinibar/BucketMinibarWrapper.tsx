import React, { ReactNode } from 'react';
import { alpha, Box } from '@mui/material';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import { ThemeMode } from '@crema/constants/AppEnums';

type BucketMinibarWrapperProps = {
  children: ReactNode;

  [x: string]: any;
};

const BucketMinibarWrapper: React.FC<BucketMinibarWrapperProps> = ({ children, ...rest }) => {
  const { sidebarBgColor, mode, sidebarTextColor } = useSidebarContext();

  return (
    <Box
      className="bucketMinibar"
      sx={[
        {
          width: 64,
          backgroundColor: sidebarBgColor,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
            width: '100%',
            height: '100%',
          },
          '& > *': {
            position: 'relative',
            zIndex: 3,
          },
          '& .logo': {
            cursor: 'pointer',
            width: 30,
          },
          '& .search-icon-btn': {
            color: sidebarTextColor,
            mb: 2.5,
            width: 40,
            height: 40,
            backgroundColor: 'transparent',
            '& svg': {
              fontSize: 20,
            },
          },
          '& .icon-btn': {
            color: sidebarTextColor,
            mb: 2.5,
            border: '0 none',
            backgroundColor: 'transparent',
          },
          '& .lang-switcher-btn': {
            mb: 2.5,
            width: 40,
            height: 40,
            border: '0 none',
            color: sidebarTextColor,
            backgroundColor: 'transparent',
          },
        },
        mode === ThemeMode.LIGHT
          ? {
              '&:before': {
                backgroundColor: (theme) => alpha(theme.palette.common.black, 0.05),
              },
            }
          : {
              '&:before': {
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.05),
              },
            },
      ]}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default BucketMinibarWrapper;
