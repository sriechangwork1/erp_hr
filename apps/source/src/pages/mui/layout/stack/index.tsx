import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Stack = asyncComponent(() =>
  import('../../../../modules/muiComponents/layout/Stack')
);
export default AppPage(() => <Stack />);
