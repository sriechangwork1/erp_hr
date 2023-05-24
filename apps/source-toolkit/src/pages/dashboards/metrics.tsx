import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Metrics = asyncComponent(
  () => import('../../modules/dashboards/Metrics'),
  { ssr: false }
);
export default AppPage(() => <Metrics />);
