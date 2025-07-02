import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import AppLogo from '@crema/components/AppLayout/components/AppLogo';

type AuthWrapperProps = {
  children: any;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          minHeight: { xs: 320, sm: 450 },
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '50%', lg: '40%' },
            padding: { xs: 5, lg: 10 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ mb: { xs: 2, xl: 2 } }}>
            <Box
              sx={{
                mb: 5,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AppLogo />
            </Box>
          </Box>
          {children}
        </Box>
        <Box
          sx={(theme) => ({
            width: { xs: '100%', sm: '50%', lg: '60%' },
            position: 'relative',
            padding: { xs: 5, lg: 5 },
            display: { xs: 'none', sm: 'flex' },
            alignItems: { sm: 'center' },
            justifyContent: { sm: 'center' },
            flexDirection: { sm: 'column' },
            backgroundColor: theme.palette.grey[600],
            color: theme.palette.common.white,
            fontSize: 14,
          })}
        >
          <Box
            sx={{
              maxWidth: 400,
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 60,
                mb: 4,
              }}
            >
              <Box component="span" sx={{ color: 'grey.800' }}>ERP</Box>
              <Box component="span" sx={{ color: 'gold', ml: 1 }}>NPU</Box>
            </Typography>
            <Typography
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 25,
                mb: 4,
              }}
            >Enterprise Resource Planning </Typography>
            <Typography
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 20,
                mb: 4,
              }}
            >มหาวิทยาลัยนครพนม </Typography>
            <Typography
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 20,
                mb: 4,
              }}
            >npu.ac.th</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default AuthWrapper;
