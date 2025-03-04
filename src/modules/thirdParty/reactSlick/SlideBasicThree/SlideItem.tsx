import React from 'react';
import { alpha, Box, Typography } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import { SlideBasicType } from '@crema/types/models/thirdParty/reactSlick';
import Image from 'next/image';

interface SlideItemProps {
  slide: SlideBasicType;
}

const SlideItem: React.FC<SlideItemProps> = ({ slide }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxHeight: { xs: '100%', md: 320 },
          minHeight: { xs: 250, md: '100%' },
          height: '100%',
          '& img': {
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          },
        }}
      >
        <Image src={`${slide.srcImg}`} alt={slide.title} width={678} height={414} />
      </Box>
      87
      <Box
        sx={(theme) => ({
          py: 3,
          px: 4,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          backgroundColor: alpha(theme.palette.common.black, 0.65),
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          color: theme.palette.common.white,
        })}
      >
        <Typography
          component="h3"
          sx={{
            fontSize: 16,
            fontWeight: Fonts.SEMI_BOLD,
            mb: 3,
          }}
        >
          {slide.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default SlideItem;
