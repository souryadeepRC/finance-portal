import { memo } from "react";
import {  useSelector } from "react-redux";
// library
import { PieChart } from "@mui/x-charts/PieChart";
// components
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
// selectors
import {
  selectCompletionPeriod,
  selectInterestAmount,
  selectLoanAmount,
  selectMonthlyEmi,
  selectTotalPaidAmount,
} from "src/store/home-loan-reducer/home-loan-selectors";
// constants
import {
  APP_PRIMARY_COLOR,
  APP_SECONDARY_COLOR,
} from "src/constants/common-constants";
// styles
import styles from "./LoanBreakup.module.scss";

const LoanBreakup = memo((): JSX.Element => {
  // store

  const loanAmount: string = useSelector(selectLoanAmount);
  const monthlyEmi: number = useSelector(selectMonthlyEmi);
  const interestAmount: number = useSelector(selectInterestAmount);

  const totalPaidAmount: number = useSelector(selectTotalPaidAmount);
  const completionPeriod: string = useSelector(selectCompletionPeriod);

  // return fns
  return (
    <div className={styles["loan-result__container"]}>
      <div className={styles["loan-breakup__container"]}>
        <div className={styles["loan-breakup-data__container"]}>
          <LoanAmountLabel label="Monthly EMI" value={monthlyEmi} />
          <LoanAmountLabel label="Principal Amount" value={+loanAmount} />
          <LoanAmountLabel label="Total Interest" value={interestAmount} />
          <LoanAmountLabel label="Total Amount" value={totalPaidAmount} />
          <DisplayLabel label="Loan Completion" value={completionPeriod} />
        </div>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: +loanAmount,
                  label: "Principal",
                  color: APP_PRIMARY_COLOR,
                },
                {
                  id: 1,
                  value: Math.round(interestAmount),
                  label: "Interest",
                  color: APP_SECONDARY_COLOR,
                },
              ],
            },
          ]}
          width={200}
          height={100}
        />
      </div>
    </div>
  );
});
LoanBreakup.displayName = "LoanBreakup";
export { LoanBreakup };
