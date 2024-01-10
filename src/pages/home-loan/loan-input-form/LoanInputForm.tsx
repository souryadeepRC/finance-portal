import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import { LoanInput } from "src/components/common/loan-input/LoanInput";
import { LoanStartPeriodForm } from "./LoanStartPeriodForm";
// store
import { AppDispatch } from "src/store/store";
// actions
import { updateLoanDetails } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectLoanDetails } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { LoanDetailsType } from "src/store/home-loan-reducer/home-loan-types";
import { LoanInputOnChangeType } from "src/components/common/loan-input/LoanInput";
// utils
import { isNumeric } from "src/utils/string-utils";
// styles
import styles from "./LoanInputForm.module.scss";

const INPUT_FORM_ID: { [index: string]: string } = {
  AMOUNT: "amount",
  INTEREST_RATE: "interestRate",
  TENURE: "tenure",
};
const LoanInputForm = memo((): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();

  const { amount, interestRate, tenure }: LoanDetailsType =
    useSelector(selectLoanDetails);

  // fns
  const onChangeLoanDetails = ({ id, value }: LoanInputOnChangeType): void => {
    dispatch(
      updateLoanDetails({
        [id]: value,
        isError: value <= 0,
      })
    );
  };

  // render fns
  return (
    <div className={styles["loan-details__container"]}>
      <LoanInput
        id={INPUT_FORM_ID.AMOUNT}
        label="Loan Amount"
        value={amount}
        minValue={1000}
        maxValue={10000000}
        adornmentPosition="start"
        adornmentIcon={<span>&#8377;</span>}
        onChange={onChangeLoanDetails}
      />
      <div className={styles["loan-rate-tenure__container"]}>
        <LoanInput
          id={INPUT_FORM_ID.INTEREST_RATE}
          label="Rate of interest"
          value={interestRate}
          step={0.1}
          minValue={1}
          maxValue={30}
          adornmentIcon={<span>%</span>}
          onChange={onChangeLoanDetails}
        />
        <LoanInput
          id={INPUT_FORM_ID.TENURE}
          label="Loan Tenure"
          value={tenure}
          minValue={1}
          maxValue={30}
          adornmentIcon={<span>Yr</span>}
          validityFunc={isNumeric}
          onChange={onChangeLoanDetails}
        />
      </div>
      <LoanStartPeriodForm />
    </div>
  );
});
LoanInputForm.displayName = "LoanInputForm";
export { LoanInputForm };
