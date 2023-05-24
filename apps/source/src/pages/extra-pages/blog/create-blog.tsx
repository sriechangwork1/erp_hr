import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const CreateBlog = asyncComponent(() =>
  import('../../../modules/extraPages/Blog/CreateBlog')
);
export default AppPage(() => <CreateBlog />);
