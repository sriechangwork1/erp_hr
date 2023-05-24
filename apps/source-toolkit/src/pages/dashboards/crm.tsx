import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const CRM = asyncComponent(() => import('../../modules/dashboards/CRM'));
export default AppPage(() => <CRM />);
