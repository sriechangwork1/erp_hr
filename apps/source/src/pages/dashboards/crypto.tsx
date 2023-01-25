import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Crypto = asyncComponent(() => import('../../modules/dashboards/Crypto'));
export default AppPage(() => <Crypto />);
