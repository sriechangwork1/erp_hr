import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
