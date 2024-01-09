import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import dayjs from "dayjs";
// common components
import { DatePicker } from "src/components/common/date-picker/DatePicker";
// store
import { AppDispatch } from "src/store/store";
// actions
import { updateLoanDetails } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectLoanStartPeriod } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { LoanStartPeriodType } from "src/store/home-loan-reducer/home-loan-types";

const LoanStartPeriodForm = memo((): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();

  const { month, year }: LoanStartPeriodType = useSelector(
    selectLoanStartPeriod
  );

  // fns
  const onStartPeriodChange = (selectedDate: dayjs.Dayjs | null): void => {
    if (!selectedDate) return;

    dispatch(
      updateLoanDetails({
        startPeriod: {
          month: selectedDate?.month(),
          year: selectedDate?.year(),
        },
        isError: false,
      })
    );
  };

  // render fns
  return (
    <DatePicker
      label="Loan Start Period"
      views={["year", "month"]}
      value={dayjs(new Date(year, month))}
      onChange={onStartPeriodChange}
      
    />
  );
});
LoanStartPeriodForm.displayName = "LoanStartPeriodForm";
export { LoanStartPeriodForm };
