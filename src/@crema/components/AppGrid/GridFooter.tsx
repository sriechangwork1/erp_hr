import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

type GridFooterProps = {
  loading: boolean;
  footerText: string;
};

const GridFooter: React.FC<GridFooterProps> = ({ loading, footerText }) => {
  if (loading) {
    return (
      <Box
        sx={(theme) => ({
          width: '100%',
          display: 'flex',
          color: theme.palette.text.secondary,
          justifyContent: 'center',
          padding: 8,
          '& .loading': {
            marginLeft: 8,
          },
        })}
      >
        <CircularProgress size={16} />
        <span className="loading">Loading...</span>
      </Box>
    );
  } else {
    return (
      <Box
        sx={(theme) => ({
          padding: 10,
          color: theme.palette.text.secondary,
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Typography>{footerText}</Typography>
      </Box>
    );
  }
};

export default GridFooter;
