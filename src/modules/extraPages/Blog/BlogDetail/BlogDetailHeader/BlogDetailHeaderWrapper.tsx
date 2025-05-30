import React from 'react';
import PropTypes from 'prop-types';
import { alpha, Box } from '@mui/material';
import { ThemeStyleRadius } from '@crema/constants/AppEnums';

const blogBgImage = '/assets/images/extra-pages/blog/blog-detail-header.png';

type Props = {
  children: React.ReactNode;
};

const BlogDetailHeaderWrapper = ({ children }: Props) => {
  const cardRadius = ThemeStyleRadius.STANDARD;

  return (
    <Box
      sx={(theme) => ({
        backgroundImage: `url(${blogBgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        position: 'relative',
        minHeight: 340,
        color: theme.palette.common.white,
        borderRadius: cardRadius / 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 5,
        '&:before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: alpha(theme.palette.common.black, 0.3),
          borderRadius: 'inherit',
        },
        '& > *': {
          position: 'relative',
          zIndex: 3,
        },
      })}
    >
      {children}
    </Box>
  );
};

export default BlogDetailHeaderWrapper;

BlogDetailHeaderWrapper.propTypes = {
  children: PropTypes.node,
};
