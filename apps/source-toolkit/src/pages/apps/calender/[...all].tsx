import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Calendar = asyncComponent(() => import('../../../modules/apps/Calendar'),{ssr:false});
export default AppPage(() => <Calendar />);
