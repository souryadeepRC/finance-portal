import { memo } from "react";
// components
import { LoanInputForm } from "src/pages/home-loan/loan-input-form/LoanInputForm";
import { LoanAmountBreakup } from "src/pages/home-loan/loan-amount-breakup/LoanAmountBreakup";
// styles
import styles from "./HomeLoan.module.scss";

const HomeLoan = memo((): JSX.Element => {
  // store 
  // render fns
  return (
    <>
      <div className={styles["home-loan__container"]}>
        <LoanInputForm />
        <LoanAmountBreakup /> 
      </div>
    </>
  );
});
HomeLoan.displayName = "HomeLoan";
export { HomeLoan };
