import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Divider = asyncComponent(() =>
  import('../../../../modules/muiComponents/dataDisplay/Divider')
);
export default AppPage(() => <Divider />);
