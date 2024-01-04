import { memo } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
// library
import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
// icons
import TuneIcon from "@mui/icons-material/Tune";
// common components
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
import { Button } from "src/components/common/button/Button";
import { Popover } from "src/components/common/popover/Popover";
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
  const loanAmount: number = useSelector(selectLoanAmount);
  const monthlyEmi: number = useSelector(selectMonthlyEmi);
  const interestAmount: number = useSelector(selectInterestAmount);
  const totalPaidAmount: number = useSelector(selectTotalPaidAmount);
  const completionPeriod: string = useSelector(selectCompletionPeriod);
  // hooks
  const navigate: NavigateFunction = useNavigate();
  // fns
  const onPrePaymentClick = (): void => {
    navigate("/homeLoan/prePayment");
  };
  // return fns
  return (
    <div className={styles["loan-result__container"]}>
      <div className={styles["loan-breakup__container"]}>
        <div className={styles["loan-breakup-data__container"]}>
          <LoanAmountLabel label="Monthly EMI" value={monthlyEmi} />
          <DisplayLabel label="Loan Completion" value={completionPeriod} />
          <Popover label="View Breakup Details">
            <Box
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <LoanAmountLabel label="Principal Amount" value={loanAmount} />
              <LoanAmountLabel label="Total Interest" value={interestAmount} />
              <LoanAmountLabel label="Total Amount" value={totalPaidAmount} />
            </Box>
          </Popover>
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
          height={200}
        />
      </div>
      <Button
        variant="contained"
        startIcon={<TuneIcon />}
        onClick={onPrePaymentClick}
      >
        Pre Payment Comparison
      </Button>
    </div>
  );
});
LoanBreakup.displayName = "LoanBreakup";
export { LoanBreakup };
