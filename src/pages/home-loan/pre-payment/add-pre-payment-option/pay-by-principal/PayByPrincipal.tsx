import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import dayjs from "dayjs";
import { Checkbox, FormControlLabel } from "@mui/material";
// icons
import SaveIcon from "@mui/icons-material/Save";
// common components
import { Button } from "src/components/common/button/Button";
import { DatePicker } from "src/components/common/date-picker/DatePicker";
import { LoanInput } from "src/components/common/loan-input/LoanInput";
import { SkeletonPrePayment } from "src/components/common/skeleton/HomeLoanSkeleton";
// actions
import { updatePrePaymentOptions } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import {
  selectLoanAmount,
  selectLoanStartPeriod,
  selectPaymentYearDetails,
} from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { AppDispatch } from "src/store/store";
import {
  LoanStartPeriodType,
  PaymentYearDetailsType,
  PrePaidPrincipalType,
} from "src/store/home-loan-reducer/home-loan-types";
import { LoanInputOnChangeType } from "src/components/common/loan-input/LoanInput";
// constants
import { PRE_PAYMENT_TYPES } from "src/store/home-loan-reducer/home-loan-constants";
// styles
import styles from "./PayByPrincipal.module.scss";
type PayByEmiProps = {
  onSave: () => void;
};
type PayByPrincipalType = {
  amount: number;
  incrementFactor: number;
  month: number;
  year: number;
};
const INITIAL_STATE: PayByPrincipalType = {
  amount: 1000,
  incrementFactor: 10,
  month: 0,
  year: 0,
};
const PayByPrincipal = memo(({ onSave }: PayByEmiProps): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const loanAmount: number = useSelector(selectLoanAmount);
  const { maxYear, minYear }: PaymentYearDetailsType = useSelector(
    selectPaymentYearDetails
  );
  const loanStartPeriod: LoanStartPeriodType = useSelector(
    selectLoanStartPeriod
  );
  // state
  const [prePaidPrincipal, setPrePaidPrincipal] =
    useState<PayByPrincipalType>(INITIAL_STATE);
  const [isIncrementChecked, setIsIncrementChecked] = useState<boolean>(false);
  // effects
  useEffect(() => {
    if (!loanStartPeriod) return;

    const { month, year } = loanStartPeriod;
    if (year !== 0) {
      setPrePaidPrincipal((prePaidPrincipal: PayByPrincipalType) => {
        return {
          ...prePaidPrincipal,
          month,
          year,
        };
      });
    }
  }, [loanStartPeriod]);
  // fns
  const onIncrementCheck = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIsIncrementChecked(event.target.checked);
  };
  const onPrePaidPrincipalMonthChange = (
    selectedDate: dayjs.Dayjs | null
  ): void => {
    setPrePaidPrincipal((prePaidPrincipal: PayByPrincipalType) => {
      return {
        ...prePaidPrincipal,
        month: selectedDate?.month() || new Date().getMonth(),
        year: selectedDate?.year() || new Date().getFullYear(),
      };
    });
  };
  const onPrePaidPrincipalChange = ({
    id,
    value,
  }: LoanInputOnChangeType): void => {
    setPrePaidPrincipal((prePaidPrincipal) => {
      return {
        ...prePaidPrincipal,
        [id]: value,
      };
    });
  };

  const onSaveBtnClick = (): void => {
    const { amount, month, year, incrementFactor } = prePaidPrincipal;
    const modifiedPrePaidValue: PrePaidPrincipalType = {
      amount,
      month,
      year,
      ...(isIncrementChecked ? { incrementFactor: incrementFactor / 100 } : {}),
    };

    if (amount === 0 || year === 0 || !modifiedPrePaidValue) return;
    dispatch(
      updatePrePaymentOptions({
        type: PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT.value,
        params: { prePaidPrincipal: modifiedPrePaidValue },
      })
    );
    onSave();
  };

  const { amount, incrementFactor, month, year } = prePaidPrincipal;
  if (year === 0) {
    return <SkeletonPrePayment />;
  }
  // render fns
  return (
    <div className={styles["pay-by-principal__container"]}>
      <div className={styles["principal-month__container"]}>
        <LoanInput
          id="amount"
          label="Pre-pay Principal every year"
          value={amount}
          minValue={INITIAL_STATE.amount}
          maxValue={loanAmount}
          adornmentPosition="start"
          adornmentIcon={<span>&#8377;</span>}
          onChange={onPrePaidPrincipalChange}
        />
        <DatePicker
          label="After this month"
          views={["year", "month"]}
          maxDate={dayjs(new Date(maxYear, 0))}
          minDate={dayjs(new Date(minYear, 0))}
          value={dayjs(new Date(year, month))}
          onChange={onPrePaidPrincipalMonthChange}
        />
      </div>
      <FormControlLabel
        className={styles["pay-by-principal-increase__checkbox"]}
        control={
          <Checkbox
            checked={isIncrementChecked}
            onChange={onIncrementCheck}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Increase Pre Paid Principal Amount"
      />
      {isIncrementChecked && (
        <div className={styles["increment-factor__container"]}>
          <LoanInput
            id="incrementFactor"
            label="Increase every year By"
            value={incrementFactor}
            minValue={INITIAL_STATE.incrementFactor}
            maxValue={100}
            step={5}
            adornmentIcon={<span>%</span>}
            onChange={onPrePaidPrincipalChange}
          />
        </div>
      )}
      <Button
        variant="contained"
        onClick={onSaveBtnClick}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </div>
  );
});
PayByPrincipal.displayName = "PayByPrincipal";
export { PayByPrincipal };
