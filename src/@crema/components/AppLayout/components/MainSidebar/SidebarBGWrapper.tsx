import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import { ThemeMode } from '@crema/constants/AppEnums';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';

type SidebarBgWrapperProps = {
  children: ReactNode;
};

const SidebarBgWrapper: React.FC<SidebarBgWrapperProps> = ({ children }) => {
  const { sidebarBgColor, sidebarTextColor, mode, isSidebarBgImage, sidebarBgImage } = useSidebarContext();
  return (
    <Box
      sx={[
        {
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: sidebarBgColor,
          color: sidebarTextColor,
          // boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.04)',
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
        },
        isSidebarBgImage
          ? {
              backgroundImage: `url(/assets/images/sidebar/images/${sidebarBgImage}.png)`,
            }
          : {
              backgroundImage: '',
            },
        isSidebarBgImage
          ? {
              backgroundRepeat: 'no-repeat',
            }
          : {
              backgroundRepeat: '',
            },
        isSidebarBgImage
          ? {
              backgroundPosition: 'center center',
            }
          : {
              backgroundPosition: '',
            },
        isSidebarBgImage
          ? {
              backgroundSize: 'cover',
            }
          : {
              backgroundSize: '',
            },
        isSidebarBgImage
          ? {
              '&:before': {
                display: 'block',
              },
            }
          : {
              '&:before': {
                display: 'none',
              },
            },
        mode === ThemeMode.LIGHT
          ? {
              '&:before': {
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.5),
              },
            }
          : {
              '&:before': {
                backgroundColor: (theme) => alpha(theme.palette.common.black, 0.5),
              },
            },
      ]}
    >
      {children}
    </Box>
  );
};

export default SidebarBgWrapper;
