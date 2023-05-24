import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const TransferList = asyncComponent(() =>
  import('../../../../modules/muiComponents/inputs/TransferList')
);
export default AppPage(() => <TransferList />);
