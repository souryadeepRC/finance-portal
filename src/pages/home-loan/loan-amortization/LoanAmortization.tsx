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
import { selectLoanPaymentYear } from "src/store/home-loan-reducer/home-loan-selectors";
// styles
import styles from "./LoanAmortization.module.scss";

const LoanAmortization = memo((): JSX.Element => {
  // store
  const loanPaymentYear: number = useSelector(selectLoanPaymentYear);

  // render fns
  if (!loanPaymentYear) {
    return <SkeletonHomeLoan />;
  }
  return (
    <div className={styles["amortization-details_container"]}>
      <AmortizationYearSelection loanPaymentYear={loanPaymentYear} />
      <YearlyAmortization />
      <MonthlyBreakup />
    </div>
  );
});
LoanAmortization.displayName = "LoanAmortization";
export { LoanAmortization };
