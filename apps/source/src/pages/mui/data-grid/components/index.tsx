import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Components = asyncComponent(() =>
  import('../../../../modules/muiComponents/datagrid/Components')
);
export default AppPage(() => <Components />);
