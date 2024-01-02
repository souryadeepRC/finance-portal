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
import styles from "./DatePicker.module.scss";

const DatePicker = memo((props: DatePickerProps<Dayjs>): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker className={styles["date-picker__container"]} {...props} />
    </LocalizationProvider>
  );
});
DatePicker.displayName = "DatePicker";
export { DatePicker };
