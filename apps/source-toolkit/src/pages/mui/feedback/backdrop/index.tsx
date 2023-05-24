import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Backdrop = asyncComponent(() =>
  import('../../../../modules/muiComponents/feedback/Backdrop')
);
export default AppPage(() => <Backdrop />);
