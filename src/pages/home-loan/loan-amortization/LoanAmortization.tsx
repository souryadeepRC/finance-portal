import { memo } from "react";
import { useSelector } from "react-redux";
// library
// common components
import { SkeletonHomeLoan } from "src/components/common/skeleton/HomeLoanSkeleton";
// components
import { YearlyAmortization } from "./yearly-amortization/YearlyAmortization";
import { MonthlyBreakup } from "./monthly-amortization/MonthlyBreakup";
import { AmortizationYearSelection } from "./amortization-year-selection/AmortizationYearSelection";
// selectors
import {
  selectLoanPaymentYear,
  selectYearlyAmortizationDetails,
} from "src/store/home-loan-reducer/home-loan-selectors";
// styles
import styles from "./LoanAmortization.module.scss";
// types
import { HomeLoanYearlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types"; 

const LoanAmortization = memo((): JSX.Element => { 
  // store
  const loanPaymentYear: number = useSelector(selectLoanPaymentYear);
  const yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[] =
    useSelector(selectYearlyAmortizationDetails);

  // calculate
  const amortizationDetails: HomeLoanYearlyAmortizationType =
    yearlyAmortizationDetails?.filter(
      (details: HomeLoanYearlyAmortizationType) =>
        details.paymentYear === loanPaymentYear
    )?.[0]; 
    
  // render fns
  if (!amortizationDetails) {
    return <SkeletonHomeLoan />;
  }

  // calculate
  const {
    principalPaid,
    interestPaid,
    paymentYear,
    remainingYearCount,
    outstandingBalance,
    monthlyBreakup,
  }: HomeLoanYearlyAmortizationType = amortizationDetails;

  return (
    <div className={styles["amortization-details_container"]}>
      <AmortizationYearSelection
        loanPaymentYear={loanPaymentYear}
      />
      <YearlyAmortization
        principalPaid={principalPaid}
        interestPaid={interestPaid}
        remainingYearCount={remainingYearCount}
        outstandingBalance={outstandingBalance}
      />
      <MonthlyBreakup
        monthlyBreakup={monthlyBreakup}
        tenureYear={paymentYear}
      />
    </div>
  );
});
LoanAmortization.displayName = "LoanAmortization";
export { LoanAmortization };
