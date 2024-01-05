import { memo } from "react";
// library
import { PieChart } from "@mui/x-charts";
import { Box } from "@mui/material";
// common components
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
import {
  APP_PRIMARY_COLOR,
  APP_SECONDARY_COLOR,
} from "src/constants/common-constants";
// styles
import styles from "./LoanAmountInfo.module.scss";
// types
import { prePaymentLoanDetailsType } from "src/store/home-loan-reducer/home-loan-types";
type LoanAmountInfoProps = {
  loanAmountInfo: prePaymentLoanDetailsType;
};
const LoanAmountInfo = memo(
  ({ loanAmountInfo }: LoanAmountInfoProps): JSX.Element => {
    // store
    const {
      principalPaid,
      interestPaid,
      monthlyEmi,
      totalAmountPaid,
      loanCompletionPeriod,
    }: prePaymentLoanDetailsType = loanAmountInfo;

    return (
      <Box
        sx={{ padding: 2 }}
        className={styles["loan-amount-info__container"]}
      >
        <LoanAmountLabel label="Monthly EMI" value={monthlyEmi} />
        <LoanAmountLabel label="Principal Amount" value={principalPaid} />
        <LoanAmountLabel label="Total Interest" value={interestPaid} />
        <LoanAmountLabel label="Total Amount" value={totalAmountPaid} />
        <DisplayLabel
          label="Loan Completion"
          value={loanCompletionPeriod.displayText}
        />
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: +principalPaid,
                  label: "Principal",
                  color: APP_PRIMARY_COLOR,
                },
                {
                  id: 1,
                  value: Math.round(interestPaid),
                  label: "Interest",
                  color: APP_SECONDARY_COLOR,
                },
              ],
            },
          ]}
          width={200}
          height={100}
        />
      </Box>
    );
  }
);
LoanAmountInfo.displayName = "LoanAmountInfo";
export { LoanAmountInfo };
