import React from 'react';
import AppCard from '@crema/components/AppCard';
import { useIntl } from 'react-intl';
import CustomerItem from './CustomerItem';
import AppList from '@crema/components/AppList';
import AppScrollbar from '@crema/components/AppScrollbar';
import { NewCustomersType } from '@crema/models/dashboards/Ecommerce';

type NewCustomersProps = {
  newCustomers: NewCustomersType[];
};

const NewCustomers: React.FC<NewCustomersProps> = ({ newCustomers }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages['eCommerce.newCustomers'] as string}
      contentStyle={{ px: 0 }}
    >
      <AppScrollbar sx={{ maxHeight: 280 }}>
        <AppList
          data={newCustomers}
          renderRow={(item) => (
            <CustomerItem listStyle="paddingX" key={item.id} item={item} />
          )}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default NewCustomers;
