import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

type ListFooterProps = {
  loading?: boolean;
  footerText: string;
};

const ListFooter: React.FC<ListFooterProps> = ({ loading = false, footerText }) => {
  return loading ? (
    <Box
      sx={(theme) => ({
        width: '100%',
        display: 'flex',
        color: theme.palette.text.secondary,
        justifyContent: 'center',
        p: 2,
        borderTop: 1,
        borderTopColor: theme.palette.divider,
        boxSizing: 'border-box',
      })}
    >
      <CircularProgress size={16} />
      <Box component="span" sx={{ ml: 2 }}>
        Loading...
      </Box>
    </Box>
  ) : (
    <Box
      sx={(theme) => ({
        p: 2.5,
        color: theme.palette.text.secondary,
        display: 'flex',
        justifyContent: 'center',
      })}
    >
      <Typography>{footerText}</Typography>
    </Box>
  );
};

export default ListFooter;
