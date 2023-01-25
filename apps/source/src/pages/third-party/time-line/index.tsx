import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const TimeLine = asyncComponent(() => import("../../../modules/thirdParty/timeLine"),
  { ssr: false });
export default AppPage(() => <TimeLine/>);
