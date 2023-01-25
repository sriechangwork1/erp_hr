import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Tables = asyncComponent(() =>
  import('../../../../modules/muiComponents/dataDisplay/Table')
);
export default AppPage(() => <Tables />);
