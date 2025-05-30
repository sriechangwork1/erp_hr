import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

type HorHeaderFixedWrapperProps = {
  children: ReactNode;

  [x: string]: any;
};

const HorHeaderFixedWrapper: React.FC<HorHeaderFixedWrapperProps> = ({ children, ...rest }) => {
  return (
    <Box
      sx={(theme) => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        '&.appMainFixedFooter': {
          pb: { xs: 12, xl: 14.5 },
        },
        '& .customizerOption': {
          top: 210,
        },
      })}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default HorHeaderFixedWrapper;
