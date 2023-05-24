import * as React from 'react';
import dayjs, {Dayjs} from 'dayjs';
import Stack from '@mui/material/Stack';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';

export default function SecondsTimePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TimePicker
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          label="With seconds"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}

        />
        <TimePicker
          ampmInClock
          views={['minutes', 'seconds']}
          label="Minutes and seconds"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}

        />
      </Stack>
    </LocalizationProvider>
  );
}
