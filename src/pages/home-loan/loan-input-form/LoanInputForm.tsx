import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
// components
import { LoanInputField } from "./loan-input-field/LoanInputField";
// actions
import {
  updateInterestRate,
  updateLoanAmount,
  updateLoanTenure,
} from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import {
  selectLoanAmount,
  selectLoanInterestRate,
  selectLoanTenure,
} from "src/store/home-loan-reducer/home-loan-selectors";
// utils
import { isFloatingNumeric, isNumeric } from "src/utils/string-utils";
// styles
import styles from "./LoanInputForm.module.scss";
// types
import { AppDispatch } from "src/store/store";

const LoanInputForm = memo((): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const loanAmount: string = useSelector(selectLoanAmount);
  const interestRate: string = useSelector(selectLoanInterestRate);
  const loanTenure: string = useSelector(selectLoanTenure);

  // fns
  const isValidData = (modifiedValue: string): boolean => {
    return modifiedValue === "" || isFloatingNumeric(modifiedValue);
  };

  const modifyLoanDetails = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const enteredId: string = e.target.id;
    const enteredValue: string = e.target.value;
    console.log({enteredValue});
    
    if (!isValidData(enteredValue)) return;  
    switch (enteredId) {
      case "loanAmount":
        dispatch(updateLoanAmount(enteredValue));
        return;
      case "interestRate":
        dispatch(updateInterestRate(enteredValue));
        return;
      case "loanTenure":
        if(isNumeric(enteredValue)){
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
        onChange={modifyLoanDetails}
      />
      <LoanInputField
        id="interestRate"
        label="Rate of interest (p.a)"
        icon="%"
        value={interestRate}
        onChange={modifyLoanDetails}
      />
      <LoanInputField
        id="loanTenure"
        label="Loan Tenure"
        icon="Yr"
        value={loanTenure}
        onChange={modifyLoanDetails}
      />
    </div>
  );
});
LoanInputForm.displayName = "LoanInputForm";
export { LoanInputForm };
