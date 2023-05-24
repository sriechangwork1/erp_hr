import React from 'react';
import AppCard from '@crema/components/AppCard';
import CalendarWrapper from './CalendarWrapper';
import { StaticDatePicker } from '@mui/lab';

const DateSelector = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <AppCard sxStyle={{ height: 1 }} contentStyle={{ padding: 0 }}>
      <CalendarWrapper>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={value}
          onChange={(newValue: Date | null) => {
            setValue(newValue);
          }}
        />
      </CalendarWrapper>
    </AppCard>
  );
};

export default DateSelector;
