import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ECommerce = asyncComponent(
  () => import('../../modules/dashboards/ECommerce'),
  { ssr: false }
);
export default AppPage(() => <ECommerce />);
