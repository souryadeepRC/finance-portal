import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
// library
import dayjs from "dayjs";
// common components
import { DatePicker } from "src/components/common/date-picker/DatePicker";
// components
import { LoanInputField } from "./loan-input-field/LoanInputField";
// store
import { AppDispatch } from "src/store/store";
// actions
import {
  updateInterestRate,
  updateLoanAmount,
  updateLoanStartPeriod,
  updateLoanTenure,
} from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import {
  selectLoanAmount,
  selectLoanInterestRate,
  selectLoanTenure,
  selectLoanStartPeriod,
} from "src/store/home-loan-reducer/home-loan-selectors";
// utils
import { isFloatingNumeric, isNumeric } from "src/utils/string-utils";
// styles
import styles from "./LoanInputForm.module.scss";
// types
import { HomeLoanInputType } from "src/store/home-loan-reducer/home-loan-types";
import { LoanStartPeriodType } from "src/store/reducer-types";

const LoanInputForm = memo((): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const loanAmount: string = useSelector(selectLoanAmount);
  const interestRate: string = useSelector(selectLoanInterestRate);
  const loanTenure: string = useSelector(selectLoanTenure);
  const { month: loanStartMonth, year: loanStartYear }: LoanStartPeriodType =
    useSelector(selectLoanStartPeriod);

  // fns
  const isValidData = (modifiedValue: string): boolean => {
    return modifiedValue === "" || isFloatingNumeric(modifiedValue);
  };
  const onLoanStartPeriodChange = (selectedDate: dayjs.Dayjs | null): void => {
    dispatch(
      updateLoanStartPeriod({
        month: selectedDate?.month() || new Date().getMonth(),
        year: selectedDate?.year() || new Date().getFullYear(),
      })
    );
  };
  const modifyLoanDetails = ({
    enteredId,
    enteredValue,
  }: HomeLoanInputType): void => {
    if (!isValidData(enteredValue)) return;
    switch (enteredId) {
      case "loanAmount":
        dispatch(updateLoanAmount(enteredValue));
        return;
      case "interestRate":
        dispatch(updateInterestRate(enteredValue));
        return;
      case "loanTenure":
        if (isNumeric(enteredValue)) {
          dispatch(updateLoanTenure(enteredValue));
        }
        return;
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
        value={loanAmount}
        defaultValue={10000}
        minValue={1000}
        maxValue={10000000}
        disabledValue={0}
        onChange={modifyLoanDetails}
      />
      <LoanInputField
        id="interestRate"
        label="Rate of interest (p.a)"
        icon="%"
        value={interestRate}
        defaultValue={6.5}
        step={0.1}
        minValue={1}
        maxValue={30}
        disabledValue={0}
        onChange={modifyLoanDetails}
      />
      <LoanInputField
        id="loanTenure"
        label="Loan Tenure"
        icon="Yr"
        value={loanTenure}
        defaultValue={10}
        minValue={1}
        maxValue={30}
        disabledValue={0}
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
