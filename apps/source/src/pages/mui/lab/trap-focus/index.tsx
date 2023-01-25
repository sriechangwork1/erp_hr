import React from 'react';
import asyncComponent from '@crema/components/AppAsyncComponent';
import AppPage from '../../../../core/AppLayout/AppPage';

const TrapFocus = asyncComponent(() =>
  import('../../../../modules/muiComponents/lab/TrapFocus')
);
export default AppPage(() => <TrapFocus />);
