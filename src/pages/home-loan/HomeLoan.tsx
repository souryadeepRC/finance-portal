import { memo } from "react";
import { useSelector } from "react-redux";
// components
import { LoanInputForm } from "./loan-input-form/LoanInputForm";
import { LoanBreakup } from "./loan-breakup/LoanBreakup";
import { LoanAmortization } from "./loan-amortization/LoanAmortization";
// selectors
import { selectYearlyAmortizationDetails } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { HomeLoanYearlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./HomeLoan.module.scss";

const HomeLoan = memo((): JSX.Element => {
  // store
  const yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[] =
    useSelector(selectYearlyAmortizationDetails);
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
