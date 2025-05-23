import React from 'react';
import BucketMinibarWrapper from './BucketMinibarWrapper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AppLngSwitcher from '../../../../AppLngSwitcher';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';
import AppMessages from '../../../../AppMessages';
import AppNotifications from '../../../../AppNotifications';
import UserInfo from '../UserInfo';
import Image from 'next/image';

const BucketMinibar = () => {
  const { theme } = useThemeContext();

  return (
    <BucketMinibarWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 1.5,
        }}
      >
        <IconButton
          sx={{
            flexDirection: 'column',
            color: 'white',
            mb: 2.5,
          }}
          aria-label="show 17 new notifications"
        >
          <Image src={'/assets/icon/logo.svg'} alt="logo" width={46} height={44} />
        </IconButton>

        <IconButton className="search-icon-btn" aria-label="show 17 new notifications">
          <SearchIcon />
        </IconButton>
        <AppLngSwitcher iconOnly={true} tooltipPosition="right" />

        <AppNotifications drawerPosition="left" tooltipPosition="right" sxNotificationContentStyle={{ width: 320 }} />
        <AppMessages drawerPosition="left" tooltipPosition="right" sxMessageContentStyle={{ width: 320 }} />
      </Box>
      <Box
        sx={{
          mt: 'auto',
        }}
      >
        <UserInfo />
      </Box>
    </BucketMinibarWrapper>
  );
};

export default BucketMinibar;
