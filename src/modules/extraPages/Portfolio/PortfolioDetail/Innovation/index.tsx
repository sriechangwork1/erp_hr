import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AppGridContainer from '@crema/components/AppGridContainer';
import PropTypes from 'prop-types';
import { Fonts } from '@crema/constants/AppEnums';
import Button from '@mui/material/Button';
import InnovationImgWrapper from './InnovationImgWrapper';
import type { InnovationType } from '@crema/types/models/extrapages/Portfolio';
import Image from 'next/image';

type Props = {
  innovation: InnovationType;
};
const Innovation = ({ innovation }: Props) => {
  return (
    <Box
      sx={{
        mb: { xs: 7.5, md: 15 },
        px: { xs: 7.5, md: 15, lg: 20 },
      }}
    >
      <AppGridContainer
        sx={{
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} md={6}>
          <InnovationImgWrapper>
            <Image
              src={innovation.srcImg}
              alt="innovation"
              width={710}
              height={397}
              sizes="100vw"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
            <Box className="innovation-img-content">
              <Typography
                component="h5"
                sx={{
                  fontSize: 12,
                  fontWeight: Fonts.SEMI_BOLD,
                  textTransform: 'uppercase',
                  mb: 1.5,
                }}
              >
                {innovation.brandSubTitle}
              </Typography>
              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: 18, md: 20, lg: 22 },
                  fontWeight: Fonts.BOLD,
                  textTransform: 'uppercase',
                }}
              >
                {innovation.brandTitle}
              </Typography>
            </Box>
          </InnovationImgWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              maxWidth: { lg: 400 },
              ml: { lg: 7.5 },
            }}
          >
            <Typography
              component="h5"
              sx={{
                fontSize: { xs: 18, md: 20 },
                fontWeight: Fonts.BOLD,
                mb: 5,
              }}
            >
              {innovation.title}
            </Typography>
            <Typography
              sx={(theme) => ({
                fontSize: 12,
                color: theme.palette.text.secondary,
                mb: { xs: 5, md: 7.5 },
              })}
            >
              {innovation.description}
            </Typography>
            <Button variant="contained">Explore Website</Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Box>
  );
};

export default Innovation;

Innovation.propTypes = {
  innovation: PropTypes.object,
};
