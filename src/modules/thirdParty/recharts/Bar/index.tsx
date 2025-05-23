'use client';
import React from 'react';
import TinyBarChart from './Components/TinyBarChart';
import StackedBarChart from './Components/StackedBarChart';
import MixBarChart from './Components/MixBarChart';
import CustomShapeBarChart from './Components/CustomShapeBarChart';
import PositiveAndNegativeBarChart from './Components/PositiveAndNegativeBarChart';
import BarChartStackedBySign from './Components/BarChartStackedBySign';
import BiaxialBarChart from './Components/BiaxialBarChart';
import Grid from '@mui/material/Grid';

import AppComponentCard from '@crema/components/AppComponentCard';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';

const BarChart = () => {
  return (
    <>
      <AppComponentHeader
        title="Bar Chart"
        description="All svg elements can be added into the BarChart component, such as defs, linearGradient, etc."
        refUrl="http://recharts.org/en-US/api/BarChart/"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Tiny Bar Chart" component={TinyBarChart} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Stacked Bar Chart" component={StackedBarChart} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Mix Bar Chart" component={MixBarChart} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Custom Shape Bar Chart" component={CustomShapeBarChart} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Positive And Negative Bar Chart" component={PositiveAndNegativeBarChart} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Bar Chart Stacked By Sign" component={BarChartStackedBySign} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Biaxial Bar Chart" component={BiaxialBarChart} />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default BarChart;
