import { memo } from "react";
// components
import { LoanInputForm } from "src/pages/home-loan/loan-input-form/LoanInputForm";
import { LoanPaymentBreakup } from "src/pages/home-loan/loan-payment-breakup/LoanPaymentBreakup";
// styles
import styles from "./HomeLoan.module.scss";

const HomeLoan = memo((): JSX.Element => {
  // render fns
  return (
    <>
      <div className={styles["home-loan__container"]}>
        <LoanInputForm />
        <LoanPaymentBreakup /> 
      </div>
    </>
  );
});
HomeLoan.displayName = "HomeLoan";
export { HomeLoan };
