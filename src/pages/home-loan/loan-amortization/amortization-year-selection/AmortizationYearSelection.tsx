import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import dayjs from "dayjs";
// common components
import { Button } from "src/components/common/button/Button";
import { DatePicker } from "src/components/common/date-picker/DatePicker";
// store
import { AppDispatch } from "src/store/store";
// actions
import { updateLoanPaymentYear } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectPaymentYearDetails } from "src/store/home-loan-reducer/home-loan-selectors";
import { PaymentYearDetailsType } from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./AmortizationSelection.module.scss";

type AmortizationYearSelectionProps = {
  loanPaymentYear: number;
};
const AmortizationYearSelection = memo(
  ({ loanPaymentYear }: AmortizationYearSelectionProps): JSX.Element => {
    // store
    const dispatch: AppDispatch = useDispatch();
    const { maxYear, minYear }: PaymentYearDetailsType = useSelector(
      selectPaymentYearDetails
    );

    // fns
    const onPrevYearClick = (): void => {
      dispatch(updateLoanPaymentYear(loanPaymentYear - 1));
    };
    const onNextYearClick = (): void => {
      dispatch(updateLoanPaymentYear(loanPaymentYear + 1));
    };
    const onTenureYearChange = (selectedDate: dayjs.Dayjs | null): void => {
      const selectedYear: number | undefined = selectedDate?.year();
      if (!selectedYear) return;
      dispatch(updateLoanPaymentYear(selectedYear));
    };

    return (
      <div className={styles["payment-year-selection__container"]}>
        <Button
          variant="contained"
          startIcon={<SkipPreviousIcon />}
          disabled={loanPaymentYear === minYear}
          onClick={onPrevYearClick}
        >
          Previous Year
        </Button>
        <DatePicker
          label="Amortization Tenure Year"
          maxDate={dayjs(new Date(maxYear, 0))}
          minDate={dayjs(new Date(minYear, 0))}
          views={["year"]}
          value={dayjs(new Date(loanPaymentYear, 0))}
          onChange={onTenureYearChange}
        />
        <Button
          variant="contained"
          endIcon={<SkipNextIcon />}
          disabled={loanPaymentYear === maxYear}
          onClick={onNextYearClick}
        >
          Next Year
        </Button>
      </div>
    );
  }
);
AmortizationYearSelection.displayName = "AmortizationYearSelection";
export { AmortizationYearSelection };
