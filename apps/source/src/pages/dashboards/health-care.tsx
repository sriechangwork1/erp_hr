import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';
import AppPageMeta from '@crema/components/AppPageMeta';

const HealthCare = asyncComponent(() =>
  import('../../modules/dashboards/HealthCare')
);

export default AppPage((props) => {
  return (
    <React.Fragment>
      <AppPageMeta title="Health Care | Crema " />
      <HealthCare />
    </React.Fragment>
  );
});

