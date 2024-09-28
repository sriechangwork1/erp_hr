import React from 'react';
import Box from '@mui/material/Box';
import { Fonts } from '@crema/constants/AppEnums';
import { TemperaturesType } from '@crema/types/models/dashboards/Widgets';
import Image from 'next/image';

type DayTemperatureProps = {
  day: TemperaturesType;
};

const DayTemperature: React.FC<DayTemperatureProps> = ({ day }) => {
  return (
    <Box
      sx={{
        px: 4,
        textAlign: 'center',
      }}
    >
      <Box
        component="span"
        sx={{
          mb: 3,
          display: 'block',
          fontWeight: Fonts.MEDIUM,
          fontSize: 14,
          textTransform: 'uppercase',
        }}
      >
        {day.day}
      </Box>
      <Box
        sx={{
          display: 'inline-block',
        }}
      >
        <Image src={day.image} alt="weather" width={27} height={20} />
      </Box>
    </Box>
  );
};

export default DayTemperature;
