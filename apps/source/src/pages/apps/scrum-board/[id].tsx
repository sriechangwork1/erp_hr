import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ScrumBoard = asyncComponent(
  () => import('../../../modules/apps/ScrumBoard'),
  { ssr: false }
);
export default AppPage(() => <ScrumBoard />);
