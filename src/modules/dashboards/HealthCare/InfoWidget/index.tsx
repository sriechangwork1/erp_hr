import React from 'react';
import AppCard from '@crema/components/AppCard';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import type { BloodCardType } from '@crema/types/models/dashboards/HealthCare';
import { Fonts } from '@crema/constants/AppEnums';
import Image from 'next/image';

type Props = {
  data: BloodCardType;
};

const InfoWidget = ({ data }: Props) => {
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      className='card-hover'
      contentStyle={{ paddingLeft: 8, paddingRight: 8 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            mt: 1,
            mb: 3,
          }}
        >
          <Image src={data.icon} alt='icon' height={60} width={60} />
        </Box>
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              color: 'text.secondary',
              mb: 3,
            }}
          >
            {data.name}
          </Box>
          <Box
            component='p'
            sx={{
              fontSize: 14,
              fontWeight: Fonts.BOLD,
              color: data.color,
            }}
          >
            {data.measurement}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default InfoWidget;

InfoWidget.propTypes = {
  data: PropTypes.object,
};
