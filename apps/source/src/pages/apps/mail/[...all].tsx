import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Mail = asyncComponent(() => import('../../../modules/apps/Mail'));
export default AppPage(() => <Mail />);
