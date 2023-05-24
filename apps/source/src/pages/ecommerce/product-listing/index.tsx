import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ProductListing = asyncComponent(() =>
  import('../../../modules/ecommerce/Admin/Listing')
);
export default AppPage(() => <ProductListing />);
