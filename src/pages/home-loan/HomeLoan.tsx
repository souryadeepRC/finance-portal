import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// components
import { LoanInputForm } from "src/pages/home-loan/loan-input-form/LoanInputForm";
import { LoanBreakup } from "src/pages/home-loan/loan-breakup/LoanBreakup";
import { LoanAmortization } from "src/pages/home-loan/loan-amortization/LoanAmortization";
// actions
import { updateLoanPaymentDetails } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import {
  selectLoanAmount,
  selectLoanInterestRate,
  selectLoanTenure,
  selectLoanStartPeriod,
} from "src/store/home-loan-reducer/home-loan-selectors";
// utils
import { calculateLoanBreakup } from "./home-loan-utils";
// types
import { HomeLoanBreakupType } from "src/store/home-loan-reducer/home-loan-types";
import { LoanStartPeriodType } from "src/store/reducer-types";
import { AppDispatch } from "src/store/store";
// styles
import styles from "./HomeLoan.module.scss";

const HomeLoan = memo((): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const loanAmount: string = useSelector(selectLoanAmount);
  const interestRate: string = useSelector(selectLoanInterestRate);
  const loanTenure: string = useSelector(selectLoanTenure);
  const loanStartPeriod: LoanStartPeriodType = useSelector(
    selectLoanStartPeriod
  );

  // effects
  useEffect(() => {
    const homeLoanBreakupDetails: HomeLoanBreakupType = calculateLoanBreakup(
      +loanAmount,
      +interestRate,
      +loanTenure,
      loanStartPeriod
    );
    
    dispatch(updateLoanPaymentDetails(homeLoanBreakupDetails));
  }, [dispatch, loanAmount, interestRate, loanTenure, loanStartPeriod]);
  // render fns
  return (
    <>
      <div className={styles["home-loan__container"]}>
        <LoanInputForm
          loanAmount={loanAmount}
          interestRate={interestRate}
          loanTenure={loanTenure}
          loanStartPeriod={loanStartPeriod}
        />
        <LoanBreakup />
      </div>
      <LoanAmortization />
    </>
  );
});
HomeLoan.displayName = "HomeLoan";
export { HomeLoan };
