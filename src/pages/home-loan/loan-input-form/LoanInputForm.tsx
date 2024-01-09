import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import dayjs from "dayjs";
// common components
import { DatePicker } from "src/components/common/date-picker/DatePicker";
// components
import { LoanInputField } from "./loan-input-field/LoanInputField";
// store
import { AppDispatch } from "src/store/store";
// actions
import { updateLoanDetails } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectLoanDetails } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import {
  HomeLoanInputType,
  LoanDetailsType,
  LoanStartPeriodType,
} from "src/store/home-loan-reducer/home-loan-types";
// utils
import { isNumeric, isValidData } from "src/utils/string-utils";
// styles
import styles from "./LoanInputForm.module.scss";

const LoanInputForm = memo((): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();

  const { amount, interestRate, tenure, startPeriod }: LoanDetailsType =
    useSelector(selectLoanDetails);
  const { month: loanStartMonth, year: loanStartYear }: LoanStartPeriodType =
    startPeriod;

  // fns
  const onLoanStartPeriodChange = (selectedDate: dayjs.Dayjs | null): void => {
    dispatch(
      updateLoanDetails({
        startPeriod: {
          month: selectedDate?.month() || new Date().getMonth(),
          year: selectedDate?.year() || new Date().getFullYear(),
        },
        isError: !selectedDate,
      })
    );
  };
  const modifyLoanDetails = ({
    enteredId,
    enteredValue,
  }: HomeLoanInputType): void => {
    if (!isValidData(enteredValue)) return;
    const modifiedValue: number = +enteredValue;
    switch (enteredId) {
      case "loanAmount": {
        dispatch(
          updateLoanDetails({
            amount: modifiedValue,
            isError: modifiedValue <= 0,
          })
        );
        return;
      }
      case "interestRate": {
        dispatch(
          updateLoanDetails({
            interestRate: modifiedValue,
            isError: modifiedValue <= 0,
          })
        );
        return;
      }
      case "loanTenure":
        if (isNumeric(enteredValue)) {
          dispatch(
            updateLoanDetails({
              tenure: modifiedValue,
              isError: modifiedValue <= 0,
            })
          );
          return;
        }
    }
  };
  // render fns
  return (
    <div className={styles["loan-details__container"]}>
      <LoanInputField
        className={styles["loan-amount-field"]} 
        id="loanAmount"
        label="Loan Amount"
        icon="&#8377;"
        value={amount} 
        minValue={1000}
        maxValue={10000000} 
        onChange={modifyLoanDetails}
      />
      <LoanInputField
        id="interestRate"
        label="Rate of interest (p.a)"
        icon="%"
        value={interestRate} 
        step={0.1}
        minValue={1}
        maxValue={30} 
        onChange={modifyLoanDetails}
      />
      <LoanInputField
        id="loanTenure"
        label="Loan Tenure"
        icon="Yr"
        value={tenure} 
        minValue={1}
        maxValue={30} 
        onChange={modifyLoanDetails}
      />
      <DatePicker
        label="Loan Start Period"
        views={["year", "month"]}
        value={dayjs(new Date(loanStartYear, loanStartMonth))}
        onChange={onLoanStartPeriodChange}
      />
    </div>
  );
});
LoanInputForm.displayName = "LoanInputForm";
export { LoanInputForm };
