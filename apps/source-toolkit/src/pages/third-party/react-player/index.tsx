import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ReactPlayer = asyncComponent(() =>
  import('../../../modules/thirdParty/reactPlayer'),
  { ssr: false }
);
export default AppPage(() => <ReactPlayer />);
