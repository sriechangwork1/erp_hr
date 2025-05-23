import React from 'react';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { UserListProps } from '@crema/types/models/Apps';

type UserSocialMediaInfoProps = {
  user: UserListProps;
};

const UserSocialMediaInfo: React.FC<UserSocialMediaInfoProps> = ({ user }) => {
  return (
    <Box
      sx={{
        color: 'grey.600',
        mx: { xs: -3, xl: -5 },
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        justifyContent: { xs: 'space-between', sm: 'flex-start' },
      }}
    >
      <Box
        sx={{
          px: { xs: 3, xl: 5 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mr: 1 }} component="span">
          {user.readTime}
        </Box>
        <IntlMessages id="common.read" />
      </Box>
      <Box sx={{ px: { xs: 3, xl: 5 }, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 1 }} component="span">
          <FacebookIcon />
        </Box>
        <Box sx={{ mr: 1 }} component="span">
          {user.shares}
        </Box>
        <IntlMessages id="common.shares" />
      </Box>
      <Box
        sx={{
          px: { xs: 3, xl: 5 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mr: 1 }} component="span">
          <TwitterIcon />
        </Box>
        <Box sx={{ mr: 1 }} component="span">
          {user.retweets}
        </Box>
        <IntlMessages id="common.retweets" />
      </Box>
    </Box>
  );
};

export default UserSocialMediaInfo;
