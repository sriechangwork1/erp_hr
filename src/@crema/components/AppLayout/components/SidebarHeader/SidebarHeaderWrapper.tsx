import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';

type SidebarHeaderWrapperProps = {
  children: ReactNode;
};

const SidebarHeaderWrapper: React.FC<SidebarHeaderWrapperProps> = ({ children }) => {
  const { sidebarHeaderColor, isSidebarBgImage } = useSidebarContext();
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          '&:hover': {
            '& .arrowIcon': {
              opacity: 1,
              visibility: 'visible',
            },
          },
        },
        isSidebarBgImage
          ? {
              backgroundColor: 'transparent',
            }
          : {
              backgroundColor: sidebarHeaderColor,
            },
      ]}
    >
      {children}
    </Box>
  );
};

export default SidebarHeaderWrapper;
