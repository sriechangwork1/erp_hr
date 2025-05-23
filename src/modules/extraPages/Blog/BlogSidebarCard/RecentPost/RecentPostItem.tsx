import React from 'react';
import { Box, Typography } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import { RecentPostType } from '@crema/types/models/extrapages/Blog';
import Image from 'next/image';

type Props = {
  recentPost: RecentPostType;
};

const RecentPostItem = ({ recentPost }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          mr: 3,
          maxWidth: 100,
          '& img': {
            width: '100%',
            display: 'block',
            borderRadius: 1,
          },
        }}
      >
        <Image src={`${recentPost.srcImg}`} alt="Recent Post" width={100} height={69} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          component="h4"
          sx={{
            fontSize: 12,
            fontWeight: Fonts.MEDIUM,
            mb: 2.5,
          }}
        >
          {recentPost.title}
        </Typography>
        <Typography
          sx={(theme) => ({
            fontSize: 12,
            color: theme.palette.text.secondary,
          })}
        >
          {recentPost.duration}
        </Typography>
      </Box>
    </Box>
  );
};

export default RecentPostItem;
