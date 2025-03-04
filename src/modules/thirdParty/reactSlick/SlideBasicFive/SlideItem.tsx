import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
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
      }}
    >
      <Box
        sx={{
          position: 'relative',
          pb: 8,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxHeight: 160,
            minHeight: 150,
            '& img': {
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <Image src={`${slide.srcImg}`} alt={slide.title} width={696} height={150} />
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            position: 'absolute',
            bottom: 0,
            left: 16,
            width: 64,
            height: 64,
            border: `solid 2px ${theme.palette.common.white}`,
            borderRadius: 2,
            '& img': {
              width: '100%',
              height: '100%',
              borderRadius: 2,
            },
          })}
        >
          <Image src={`${slide.srcImg}`} alt={slide.title} width={60} height={60} />
        </Box>
      </Box>
      <Box
        sx={{
          py: 3,
          px: 4,
        }}
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
        <Typography>{slide.description}</Typography>
      </Box>
    </Box>
  );
};

export default SlideItem;
