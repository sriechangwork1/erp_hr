import React from 'react';
import MediaSlider from './MediaSlider';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import { SlideType } from '@crema/types/models/extrapages/Portfolio';
import Image from 'next/image';

const settings = {
  infinite: true,
  speed: 500,
  dots: false,
  centerMode: true,
  centerPadding: '160px',
  slidesToShow: 1,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1536,
      settings: {
        centerMode: true,
        centerPadding: '160px',
      },
    },
    {
      breakpoint: 1200,
      settings: {
        centerMode: true,
        centerPadding: '100px',
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '60px',
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

type Props = {
  slide: SlideType[];
};

const PortfolioSlider = ({ slide }: Props) => {
  return (
    <MediaSlider>
      <Slider {...settings}>
        {slide.map((data, index) => (
          <Box
            key={index}
            sx={{
              '& img': {
                width: '100%',
              },
            }}
          >
            <Image
              src={data.srcImg}
              alt="slide"
              width={1247}
              height={468}
              sizes="100vw"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
        ))}
      </Slider>
    </MediaSlider>
  );
};

export default PortfolioSlider;
