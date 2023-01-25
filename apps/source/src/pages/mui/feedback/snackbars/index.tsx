import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Snackbar = asyncComponent(() =>
  import('../../../../modules/muiComponents/feedback/Snackbar')
);
export default AppPage(() => <Snackbar />);
