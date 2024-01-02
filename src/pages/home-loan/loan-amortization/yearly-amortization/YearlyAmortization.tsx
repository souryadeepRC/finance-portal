import { memo } from "react";
import { useSelector } from "react-redux";
// components
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
//selectors
import { selectLoanAmount } from "src/store/home-loan-reducer/home-loan-selectors";
// styles
import styles from "./YearlyAmortization.module.scss";
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";

type YearlyAmortizationProps = {
  principalPaid: number;
  interestPaid: number;
  outstandingBalance: number;
  remainingYearCount: number;
};
const YearlyAmortization = memo(
  ({
    principalPaid,
    interestPaid,
    outstandingBalance,
    remainingYearCount,
  }: YearlyAmortizationProps): JSX.Element => {
    const loanAmount: number = useSelector(selectLoanAmount);

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
  }
);
YearlyAmortization.displayName = "YearlyAmortization";
export { YearlyAmortization };
