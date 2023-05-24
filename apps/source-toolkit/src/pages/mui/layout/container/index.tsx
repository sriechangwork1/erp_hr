import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Container = asyncComponent(() =>
  import('../../../../modules/muiComponents/layout/Container')
);
export default AppPage(() => <Container />);
