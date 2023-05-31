import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Error404 = asyncComponent(
  () => import('../../modules/errorPages/Error404')
);
export default AppPage(() => <Error404 />);
