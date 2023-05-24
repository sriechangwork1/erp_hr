import React from 'react';

import asyncComponent from '@crema/components/AppAsyncComponent';
import AppPage from '../../core/AppLayout/AppPage';

const Invoice = asyncComponent(() => import('../../modules/invoice/Listing'));
export default AppPage(() => <Invoice />);
