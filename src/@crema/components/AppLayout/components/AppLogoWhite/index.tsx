import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

const AppLogoWhite = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
        <Image
          src={'/assets/images/logo-white.png'}
          alt="crema-logo"
          height={30}
          width={30}
          sizes="100vw"
          style={{
            marginRight: 10,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
      <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
        <Image
          src={'/assets/images/logo-white-with-name.png'}
          alt="crema-logo"
          height={30}
          width={146}
          sizes="100vw"
          style={{
            marginRight: 10,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </Box>
  );
};

export default AppLogoWhite;
