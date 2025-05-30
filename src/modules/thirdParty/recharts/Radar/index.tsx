'use client';
import React from 'react';
import SimpleRadarChart from './Components/SimpleRadarChart';
import SpecifiedDomainRadarChart from './Components/SpecifiedDomainRadarChart';
import Grid from '@mui/material/Grid';

import AppComponentCard from '@crema/components/AppComponentCard';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';

const Radar = () => {
  return (
    <>
      <AppComponentHeader title="Radar Chart" refUrl="http://recharts.org/en-US/api/RadarChart" />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Simple Radar Chart" component={SimpleRadarChart} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Specified Domain Radar Chart" component={SpecifiedDomainRadarChart} />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Radar;
