'use client';
import React from 'react';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
/*import AppComponentCard from '@crema/components/AppComponentCard';
// import SimpleChart from './SimpleChart';
import SimpleGuage from './SimpleGuage';
import WorldMap from './WorldMap';
import StackedColumns from './StackedColumns';
import StackedNegative from './StackedNegative';
import StackedArea from './StackedArea';*/

const FusionCharts = () => {
  return (
    <>
      <AppComponentHeader
        title="FusionCharts"
        description="Build beautiful web & mobile dashboards"
        refUrl="https://www.fusioncharts.com/react-charts?framework=react/"
      />

      <AppGridContainer>
        <Grid item xs={24}>
          <strong>Code Commented due to some issue with Froala Editor at compile time.</strong>
          <pre>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Module not found: Error: Can't resolve 'crypto' in
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            '...\node_modules\froala-editor\js' BREAKING CHANGE: webpack &#60; 5 used to include polyfills for node.js
            core modules by default
          </pre>
          <strong>If you want to use this just uncomment the code and go ahead.</strong>
        </Grid>
        {/*<Col xs={24} lg={12}>
          <AppComponentCard
            title='Stacked Columns'
            component={StackedColumns}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Stacked Negative"
            component={StackedNegative}
            source={StackedNegativeSource}
          />
        </Col>
        <Col xs={24} lg={12}>
          <AppComponentCard
            title="Stacked Area"
            component={StackedArea}
            source={StackedAreaSource}
          />
        </Col>
        <Col xs={24} lg={12}>
          <AppComponentCard
            title="Simple Chart"
            component={SimpleChart}
            source={SimpleChartSource}
          />
        </Col>
        <Col xs={24} lg={12}>
          <AppComponentCard
            title="Simple Guage"
            component={SimpleGuage}
            source={SimpleGuageSource}
          />
        </Col>
        <Col xs={24} lg={12}>
          <AppComponentCard
            title="WorldMap"
            component={WorldMap}
            source={WorldMapSource}
          />
        </Col>*/}
      </AppGridContainer>
    </>
  );
};

export default FusionCharts;
