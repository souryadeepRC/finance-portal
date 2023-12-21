import { memo } from "react";
// components
import { LoanInputForm } from "./loan-input-form/LoanInputForm";
import { LoanBreakup } from "./loan-breakup/LoanBreakup";
import { LoanAmortization } from "./loan-amortization/LoanAmortization";
// styles
import styles from "./HomeLoan.module.scss";

const HomeLoan = memo((): JSX.Element => {
  // render fns
  return (
    <>
      <div className={styles["home-loan__container"]}>
        <LoanInputForm />
        <LoanBreakup />
      </div>
      <LoanAmortization />
    </>
  );
});
HomeLoan.displayName = "HomeLoan";
export { HomeLoan };
