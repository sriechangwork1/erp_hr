import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Todo = asyncComponent(() => import('../../../modules/apps/ToDo'));
export default AppPage(() => <Todo />);
