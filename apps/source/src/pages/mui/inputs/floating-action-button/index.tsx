import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const FAB = asyncComponent(() =>
  import('../../../../modules/muiComponents/inputs/FloatingActionButton')
);
export default AppPage(() => <FAB />);
