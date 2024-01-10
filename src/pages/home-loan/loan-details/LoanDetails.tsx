import { memo } from "react";
import { useSelector } from "react-redux";
// common components
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
import { Popover } from "src/components/common/popover/Popover";
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
// components
import { PaidAmountBreakup } from "src/pages/home-loan/loan-details/PaidAmountBreakup";
// selectors
import { selectLoanPaidAmountBreakup } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { PaidAmountBreakupType } from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./LoanDetails.module.scss";

const LoanDetails = memo((): JSX.Element => {
  // store
  const paidAmountBreakup: PaidAmountBreakupType = useSelector(
    selectLoanPaidAmountBreakup
  );
  const { monthlyEmi, interestPaid, completionPeriod } = paidAmountBreakup;
  const completionPeriodText: string = completionPeriod?.displayText;

  return (
    <div className={styles["loan-details__container"]}>
      <LoanAmountLabel label="Monthly EMI" value={monthlyEmi} />
      <LoanAmountLabel label="Total Interest" value={interestPaid} />
      <DisplayLabel label="Loan Completion" value={completionPeriodText} />

      <Popover label="View Loan Breakup">
        <PaidAmountBreakup breakupDetails={paidAmountBreakup} />
      </Popover>
    </div>
  );
});
LoanDetails.displayName = "LoanDetails";
export { LoanDetails };
