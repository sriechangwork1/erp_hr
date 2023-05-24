import * as React from 'react';
import dayjs, {Dayjs} from 'dayjs';
import Stack from '@mui/material/Stack';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {MobileTimePicker} from '@mui/x-date-pickers/MobileTimePicker';
import {DesktopTimePicker} from '@mui/x-date-pickers/DesktopTimePicker';

export default function ResponsiveTimePickers() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2018-01-01T00:00:00.000Z'),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileTimePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}

        />
        <DesktopTimePicker
          label="For desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}

        />
        <TimePicker
          value={value}
          onChange={setValue}

        />
      </Stack>
    </LocalizationProvider>
  );
}
