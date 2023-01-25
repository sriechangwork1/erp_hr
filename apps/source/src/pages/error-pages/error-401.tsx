import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Error401 = asyncComponent(() =>
  import('../../modules/errorPages/Error401')
);
export default AppPage(() => <Error401 />);
