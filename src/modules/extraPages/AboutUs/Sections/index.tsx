import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Fonts } from '@crema/constants/AppEnums';
import { Typography } from '@mui/material';
import AppCard from '@crema/components/AppCard';
import { AboutUsSectionData } from '@crema/fakedb/extraPages';

type SectionProps = {
  data: AboutUsSectionData;
};
const Sections = ({ data }: SectionProps) => {
  return (
    <AppCard sx={{ height: '100%' }}>
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Avatar
          sx={(theme) => ({
            backgroundColor: data.avatarColor,
            color: theme.palette.common.white,
          })}
        >
          {data.icon}
        </Avatar>
      </Box>
      <Typography
        component="h3"
        sx={{
          mb: 2.5,
          fontWeight: Fonts.SEMI_BOLD,
          fontSize: 16,
        }}
      >
        {data.title}
      </Typography>
      <Typography
        sx={(theme) => ({
          mb: 2,
          color: theme.palette.text.secondary,
        })}
      >
        {data.content}
      </Typography>
    </AppCard>
  );
};

export default Sections;
