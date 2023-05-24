import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const InvoiceSettings = asyncComponent(() =>
  import('../../../modules/invoice/Settings')
);
export default AppPage(() => <InvoiceSettings />);
