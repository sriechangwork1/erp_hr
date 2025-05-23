'use client';
import React from 'react';
import Grid from '@mui/material/Grid';

import AppComponentCard from '@crema/components/AppComponentCard';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';
import Basic from './Basic';

import StylingDropzone from './StylingDropzone';

import DialogProgrammatically from './DialogProgrammatically';

import Previews from './Previews';

const ReactDropzone = () => {
  return (
    <>
      <AppComponentHeader
        title="React Dropzone"
        description="Simple React hook to create a HTML5-compliant drag'n'drop zone for files."
        refUrl="https://react-dropzone.netlify.com/"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Basic" component={Basic} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Styling Dropzone" component={StylingDropzone} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Previews" component={Previews} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Dialog Programmatically" component={DialogProgrammatically} />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default ReactDropzone;
