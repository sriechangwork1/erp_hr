import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const FileStack = asyncComponent(
  () => import('../../../modules/thirdParty/filestack'),
  { ssr: false }
);
export default AppPage(() => <FileStack />);
