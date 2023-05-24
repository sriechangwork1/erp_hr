import * as React from 'react';
import {Dayjs} from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';

export default function FormPropsDateTimePickers() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
          label="disabled"
          disabled
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}

        />
        <DateTimePicker
          label="read-only"
          readOnly
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}

        />
      </Stack>
    </LocalizationProvider>
  );
}
