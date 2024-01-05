import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import dayjs from "dayjs";
// common components
import { Loader } from "src/components/common/loader/Loader";
import { Button } from "src/components/common/button/Button";
import { DatePicker } from "src/components/common/date-picker/DatePicker";
// components
import { LoanInputField } from "src/pages/home-loan/loan-input-form/loan-input-field/LoanInputField";
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
  HomeLoanInputType,
  LoanStartPeriodType,
  PaymentYearDetailsType,
  PrePaidPrincipalType,
} from "src/store/home-loan-reducer/home-loan-types";
// utils
import { isValidData } from "src/utils/string-utils";
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
    enteredId,
    enteredValue,
  }: HomeLoanInputType): void => {
    if (!isValidData(enteredValue)) return;

    setPrePaidPrincipal((prePaidPrincipal) => {
      return {
        ...prePaidPrincipal,
        [enteredId]: +enteredValue,
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

    dispatch(
      updatePrePaymentOptions({
        prePaymentType: PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT,
        prePaymentInfo: { prePaidPrincipal: modifiedPrePaidValue },
      })
    );
    onSave();
  };

  const { amount, incrementFactor, month, year } = prePaidPrincipal;
  if(year===0){
    return <Loader />
  }
  // render fns
  return (
    <Box className={styles["pay-by-principal__container"]}>
      <Box
        sx={{
          width: "85%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <LoanInputField
            className={styles["updated-principal__input"]}
            id="amount"
            label="Pre-pay Principal every year"
            icon="&#8377;"
            value={amount}
            defaultValue={INITIAL_STATE.amount}
            minValue={INITIAL_STATE.amount}
            maxValue={loanAmount}
            disabledValue={0}
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
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
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
          </Box>

          {isIncrementChecked && (
            <Box sx={{ display: "flex", gap: 3,
            width: "100%",
            justifyContent: "center", }}>
              <LoanInputField
                id="incrementFactor"
                label="Increase every year By"
                icon="%"
                value={incrementFactor}
                defaultValue={INITIAL_STATE.incrementFactor}
                minValue={INITIAL_STATE.incrementFactor}
                maxValue={100}
                step={5}
                disabledValue={0}
                onChange={onPrePaidPrincipalChange}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Button variant="contained" onClick={onSaveBtnClick}>
        Save
      </Button>
    </Box>
  );
});
PayByPrincipal.displayName = "PayByPrincipal";
export { PayByPrincipal };
