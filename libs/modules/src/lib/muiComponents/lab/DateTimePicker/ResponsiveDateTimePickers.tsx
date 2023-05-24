import * as React from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import {DesktopDateTimePicker} from '@mui/x-date-pickers/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';

export default function ResponsiveDateTimePickers() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2018-01-01T00:00:00.000Z'),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileDateTimePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}

        />
        <DesktopDateTimePicker
          label="For desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}

        />
        <DateTimePicker
          label="Responsive"

          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
