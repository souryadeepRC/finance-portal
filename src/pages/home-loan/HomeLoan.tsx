import { memo } from "react";
import { useSelector } from "react-redux";
// components
import { LoanInputForm } from "./loan-input-form/LoanInputForm";
// selectors
import {
  selectLoanAmount,
  selectLoanInterestRate,
  selectLoanTenure,
} from "src/store/home-loan-reducer/home-loan-selectors";
// utils
import { calculateEMI } from "./home-loan-utils";
// styles
import styles from "./HomeLoan.module.scss";

const HomeLoan = memo((): JSX.Element => {
  // store
  const loanAmount: string = useSelector(selectLoanAmount);
  const interestRate: string = useSelector(selectLoanInterestRate);
  const loanTenure: string = useSelector(selectLoanTenure);

  // compute
  const monthlyEmi: number = calculateEMI(+loanAmount, +interestRate, +loanTenure);
  const completionMonth: string = "April 2029";
  // render fns
  return (
    <div className={styles["home-loan__container"]}>
      <LoanInputForm />
      <div className={styles["loan-result__container"]}>
        {+loanTenure === 0 && <span>Please enter at least some tenure</span>}
        {+loanTenure > 0 && +loanTenure <= 30 ? (
          <>
            <span>
              <label className={styles["result-label"]}>Monthly EMI :: </label>
              <span>&#8377;</span>
              {monthlyEmi}
            </span>
            <span>
              <label className={styles["result-label"]}>
                Completion Month ::{" "}
              </label>
              {completionMonth}
            </span>
          </>
        ) : (
          <span>Maximum Tenure is 30 Years</span>
        )}
      </div>
    </div>
  );
});
HomeLoan.displayName = "HomeLoan";
export { HomeLoan };
