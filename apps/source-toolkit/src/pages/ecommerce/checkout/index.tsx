import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Checkout = asyncComponent(() =>
  import('../../../modules/ecommerce/Checkout')
);
export default AppPage(() => <Checkout />);
