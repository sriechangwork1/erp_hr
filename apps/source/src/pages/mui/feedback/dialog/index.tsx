import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Dialogs = asyncComponent(() =>
  import('../../../../modules/muiComponents/feedback/Dialog')
);
export default AppPage(() => <Dialogs />);
