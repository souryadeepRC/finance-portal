import { memo, useEffect, useState } from "react";
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
import { HomeLoanBreakupType,LoanStartPeriodType } from "src/store/home-loan-reducer/home-loan-types";
import { AppDispatch } from "src/store/store";
// styles
import styles from "./HomeLoan.module.scss";

const HomeLoan = memo((): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const loanAmount: number = useSelector(selectLoanAmount);
  const interestRate: number = useSelector(selectLoanInterestRate);
  const loanTenure: number = useSelector(selectLoanTenure);
  const loanStartPeriod: LoanStartPeriodType = useSelector(
    selectLoanStartPeriod
  );
  const [isValidForm, setIsValidForm] = useState<boolean>(true);
  // effects
  useEffect(() => {
    if (loanAmount > 0 && interestRate > 0 && loanTenure > 0) {
      const homeLoanBreakupDetails: HomeLoanBreakupType = calculateLoanBreakup(
        loanAmount,
        interestRate,
        loanTenure,
        loanStartPeriod
      );
      dispatch(updateLoanPaymentDetails(homeLoanBreakupDetails));
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
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
        {isValidForm && <LoanBreakup />}
      </div>
      {isValidForm && <LoanAmortization />}
    </>
  );
});
HomeLoan.displayName = "HomeLoan";
export { HomeLoan };
