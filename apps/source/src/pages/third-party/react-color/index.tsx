import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ReactColor = asyncComponent(() =>
  import('../../../modules/thirdParty/reactColor'),
  { ssr: false }
);
export default AppPage(() => <ReactColor />);
