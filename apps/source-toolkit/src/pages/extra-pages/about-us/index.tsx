import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const AboutUs = asyncComponent(
  () => import('../../../modules/extraPages/AboutUs')
);
export default AppPage(() => <AboutUs />);
