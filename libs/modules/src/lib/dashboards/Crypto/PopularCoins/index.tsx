import React from 'react';
import PopularCoinsTable from './PopularCoinsTable';
import AppCard from '@crema/components/AppCard';
import { useIntl } from 'react-intl';
import { PopularCoinsType } from '@crema/models/dashboards/Crypto';

type PopularCoinsProps ={
  popularCoins: PopularCoinsType[];
}

const PopularCoins: React.FC<PopularCoinsProps> = ({ popularCoins }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      contentStyle={{ px: 0 }}
      title={messages['dashboard.popularCoins'] as string}
      action={messages['common.viewAll'] as string}
    >
      <PopularCoinsTable popularCoins={popularCoins} />
    </AppCard>
  );
};

export default PopularCoins;
