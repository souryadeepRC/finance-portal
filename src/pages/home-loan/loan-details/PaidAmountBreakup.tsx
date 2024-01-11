import { memo } from "react";
// common components
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
// components
import { BreakupChart } from "src/pages/home-loan/loan-details/BreakupChart";
// types
import { PaidAmountBreakupType } from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./LoanDetails.module.scss";

type PaidAmountBreakupProps = {
  breakupDetails: PaidAmountBreakupType;
};
const PaidAmountBreakup = memo(
  ({ breakupDetails }: PaidAmountBreakupProps): JSX.Element => {
    // store
    const {
      principalPaid,
      interestPaid,
      monthlyEmi,
      totalPaidAmount,
      completionPeriod,
    }: PaidAmountBreakupType = breakupDetails;

    return (
      <div className={styles["paid-amount-breakup__container"]}>
        <LoanAmountLabel label="Monthly EMI" value={monthlyEmi} />
        <LoanAmountLabel label="Principal Amount" value={principalPaid} />
        <LoanAmountLabel label="Total Interest" value={interestPaid} />
        <LoanAmountLabel label="Total Amount" value={totalPaidAmount} />
        <DisplayLabel
          label="Loan Completion"
          value={completionPeriod.displayText}
        />
        <BreakupChart
          principalPaid={principalPaid}
          interestPaid={Math.round(interestPaid)}
        />
      </div>
    );
  }
);
PaidAmountBreakup.displayName = "PaidAmountBreakup";
export { PaidAmountBreakup };
