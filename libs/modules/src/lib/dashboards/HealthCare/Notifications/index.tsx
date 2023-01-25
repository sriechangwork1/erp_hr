import React from 'react';
import AppCard from '@crema/components/AppCard';
import { useIntl } from 'react-intl';
import AppMenu from '@crema/components/AppMenu';
import AppScrollbar from '@crema/components/AppScrollbar';
import AppList from '@crema/components/AppList';
import NotificationCell from './NotificationCell';
import { NotificationType } from '@crema/models/dashboards/HealthCare';

type NotificationsProps = {
  data: NotificationType[];
};

const Notifications: React.FC<NotificationsProps> = ({ data }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      contentStyle={{ px: 0 }}
      title={messages['healthCare.notification'] as string}
      action={<AppMenu />}
    >
      <AppScrollbar sx={{ maxHeight: 280 }}>
        <AppList
          data={data}
          renderRow={(notification) => (
            <NotificationCell
              key={notification.id}
              notification={notification}
            />
          )}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default Notifications;
