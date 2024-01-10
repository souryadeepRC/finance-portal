import { memo } from "react";
// library
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  DatePickerProps,
  DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
// styles
import "./DatePicker.scss";

const DatePicker = memo((props: DatePickerProps<Dayjs>): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker className="date-picker__container" {...props} />
    </LocalizationProvider>
  );
});
DatePicker.displayName = "DatePicker";
export { DatePicker };
