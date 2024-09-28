import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

type AppsFooterProps = {
  children: ReactNode;
};

const AppsFooter: React.FC<AppsFooterProps> = (props) => {
  const { children } = props;
  return (
    <Box
      sx={(theme) => ({
        px: 5,
        py: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
      })}
    >
      {children}
    </Box>
  );
};

export default AppsFooter;
