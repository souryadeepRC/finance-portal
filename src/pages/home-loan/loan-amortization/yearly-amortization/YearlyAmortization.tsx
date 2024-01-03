import { memo } from "react";
import { useSelector } from "react-redux";
// common components
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
//selectors
import {
  selectLoanAmount,
  selectPaymentYearAmortization,
} from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { HomeLoanYearlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./YearlyAmortization.module.scss";

const YearlyAmortization = memo((): JSX.Element => {
  const loanAmount: number = useSelector(selectLoanAmount);
  const {
    principalPaid,
    interestPaid,
    outstandingBalance,
    remainingYearCount,
  }: HomeLoanYearlyAmortizationType = useSelector(
    selectPaymentYearAmortization
  );
  return (
    <>
      <div className={styles["amortization-amount__container"]}>
        <div className={styles["paid-amount__container"]}>
          <LoanAmountLabel label="Principal Paid" value={principalPaid} />
          <LoanAmountLabel label="Interest Paid" value={interestPaid} />
        </div>
        <div className={styles["recovered-amount__container"]}>
          <LoanAmountLabel
            label="Outstanding Balance"
            value={outstandingBalance}
          />
          <LoanAmountLabel
            label="Loan Recovered"
            value={loanAmount - outstandingBalance}
          />
        </div>
      </div>
      {remainingYearCount === 0 ? (
        <DisplayLabel label="Congratulations! " value="Loan paid completely" />
      ) : (
        <DisplayLabel
          label={`${remainingYearCount} `}
          value={`Year${remainingYearCount > 1 ? "s" : ""} Left`}
        />
      )}
    </>
  );
});
YearlyAmortization.displayName = "YearlyAmortization";
export { YearlyAmortization };
