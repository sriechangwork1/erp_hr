import * as React from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function JalaliDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date(2022, 3, 7));

  return (
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
  );
}
