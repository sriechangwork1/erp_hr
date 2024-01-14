import React from 'react';
import Hidden from '@mui/material/Hidden';
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
      <Hidden smUp>
        <Image
          src={'/assets/images/logo-white.png'}
          alt='crema-logo'
          height={30}
          width={30}
          sizes='100vw'
          style={{
            marginRight: 10,
            width: '100%',
            height: '100%',
          }}
        />
      </Hidden>
      <Hidden smDown>
        <Image
          src={'/assets/images/logo-white-with-name.png'}
          alt='crema-logo'
          height={30}
          width={146}
          sizes='100vw'
          style={{
            marginRight: 10,
            width: '100%',
            height: '100%',
          }}
        />
      </Hidden>
    </Box>
  );
};

export default AppLogoWhite;
