import { memo, useState } from "react";
// components
import { LoanInputField } from "./loan-input-field/LoanInputField";
// utils
import { isNumeric } from "src/utils/string-utils";
// styles
import styles from "./HomeLoan.module.scss";
type LoanDetailsType = {
  loanAmount: string;
  loanTenure: string;
  interestRate: string;
};
const INITIAL_LOAN_DETAILS: LoanDetailsType = {
  loanAmount: "10000",
  loanTenure: "5",
  interestRate: "6.5",
};

const HomeLoan = memo((): JSX.Element => {
  const [loanDetails, setLoanDetails] =
    useState<LoanDetailsType>(INITIAL_LOAN_DETAILS);
  // fns
  const modifyLoanDetails = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const enteredValue: string = e.target.value;

    if (!enteredValue || isNumeric(enteredValue)) {
      setLoanDetails((loanDetails: LoanDetailsType): LoanDetailsType => {
        return {
          ...loanDetails,
          [e.target.id]: e.target.value,
        };
      });
    }
  };
  // compute
  const { loanAmount, loanTenure, interestRate }: LoanDetailsType = loanDetails;
  const monthlyEmi: string = "19548";
  const completionMonth: string = "April 2029";
  // render fns
  return (
    <div className={styles["home-loan__container"]}>
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
      <div className={styles["loan-result__container"]}>
        <span>
          <label className={styles["result-label"]}>Monthly EMI :: </label>
          <span>&#8377;</span>
          {monthlyEmi}
        </span>
        <span>
          <label className={styles["result-label"]}>Completion Month :: </label>
          {completionMonth}
        </span>
      </div>
    </div>
  );
});
HomeLoan.displayName = "HomeLoan";
export { HomeLoan };
