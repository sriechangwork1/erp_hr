import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Paper = asyncComponent(() =>
  import('../../../../modules/muiComponents/surfaces/Paper')
);
export default AppPage(() => <Paper />);
