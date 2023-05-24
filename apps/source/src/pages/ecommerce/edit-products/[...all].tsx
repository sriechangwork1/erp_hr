import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const EditProduct = asyncComponent(() =>
  import('../../../modules/ecommerce/Admin/EditProduct')
);
export default AppPage(() => <EditProduct />);
