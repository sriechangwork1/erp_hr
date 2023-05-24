import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Skeleton = asyncComponent(() =>
  import('../../../../modules/muiComponents/feedback/Skeleton')
);
export default AppPage(() => <Skeleton />);
