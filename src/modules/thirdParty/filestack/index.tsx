'use client';
import React from 'react';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppComponentCard from '@crema/components/AppComponentCard';
import InlinePicker from './Inline';
import DNDPicker from './DNDPicker';

const FileStack = () => {
  return (
    <>
      <AppComponentHeader
        title="Filestack File Uploader & File Upload API"
        description="Simple file uploader & powerful APIs to upload, transform & deliver any file into your app."
        refUrl="https://www.filestack.com/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard title="Inline Picker" component={InlinePicker} />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard title="Drop Pane Picker" component={DNDPicker} />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default FileStack;
