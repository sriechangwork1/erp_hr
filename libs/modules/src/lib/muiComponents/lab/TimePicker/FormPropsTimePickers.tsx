import * as React from 'react';
import {Dayjs} from 'dayjs';
import Stack from '@mui/material/Stack';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';

export default function FormPropsTimePickers() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TimePicker
          label="disabled"
          disabled
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}

        />
        <TimePicker
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
