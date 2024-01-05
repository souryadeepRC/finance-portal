import { memo } from "react";
// library
import { PieChart } from "@mui/x-charts";
import { Box } from "@mui/material";
// common components
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
// hooks
import { useMedia } from "src/hooks/useMedia";
import {
  APP_PRIMARY_COLOR,
  APP_SECONDARY_COLOR,
} from "src/constants/common-constants";
// types
import { prePaymentLoanDetailsType } from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./LoanAmountInfo.module.scss";

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

    // hooks
    const isMobile: boolean = useMedia();

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
          width={isMobile ? 200 : 200}
          height={isMobile ? 100 : 80}
        />
      </Box>
    );
  }
);
LoanAmountInfo.displayName = "LoanAmountInfo";
export { LoanAmountInfo };
