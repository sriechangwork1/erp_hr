import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Transitions = asyncComponent(() =>
  import('../../../../modules/muiComponents/utils/Transitions')
);
export default AppPage(() => <Transitions />);
