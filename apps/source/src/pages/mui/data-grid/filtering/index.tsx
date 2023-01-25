import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Filtering = asyncComponent(() =>
  import('../../../../modules/muiComponents/datagrid/Filtering')
);
export default AppPage(() => <Filtering />);
