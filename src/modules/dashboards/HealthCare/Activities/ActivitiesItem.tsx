import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import type { ActivityType } from '@crema/types/models/dashboards/HealthCare';
import { Fonts } from '@crema/constants/AppEnums';
import Image from 'next/image';

type Props = {
  activities: ActivityType;
};

const ActivitiesItem = ({ activities }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          mr: 4,
          minWidth: 60,
          width: 60,
          height: 60,
          '& img': {
            width: '100%',
          },
        }}
      >
        <Image src={activities.srcImg} alt={activities.name} width={60} height={60} />
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: Fonts.MEDIUM,
            color: 'text.secondary',
            mb: 0.5,
          }}
        >
          {activities.name}
        </Typography>
        <Typography
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {activities.value}
        </Typography>
      </Box>
    </Box>
  );
};

export default ActivitiesItem;

ActivitiesItem.propTypes = {
  activities: PropTypes.object.isRequired,
};
