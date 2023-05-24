import React from 'react';

import asyncComponent from '@crema/components/AppAsyncComponent';
import AppPage from '../../../core/AppLayout/AppPage';

const InvoicePdf = asyncComponent(
  () => import('../../../modules/invoice/InvoicePdf')
);
export default AppPage(() => <InvoicePdf />);
