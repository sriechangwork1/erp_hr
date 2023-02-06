import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Page2 = asyncComponent(() =>
  import('../../modules/sample/Page2'),
);
export default AppPage(() => <Page2 />);
