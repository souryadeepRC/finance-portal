import { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// library
import { PieChart } from "@mui/x-charts";
import { Box } from "@mui/material";
// icons
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// common components
import { Button } from "src/components/common/button/Button";
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
import {
  APP_PRIMARY_COLOR,
  APP_SECONDARY_COLOR,
} from "src/constants/common-constants";
// selectors
import {
  selectCompletionPeriod,
  selectInterestAmount,
  selectLoanAmount,
  selectMonthlyEmi,
  selectTotalPaidAmount,
} from "src/store/home-loan-reducer/home-loan-selectors";
// styles
import styles from "./LoanDetails.module.scss";

const LoanDetails = memo((): JSX.Element => {
  // hooks
  const navigate = useNavigate();
  // fns
  const onBackBtnClick = () => {
    navigate("/homeLoan");
  };
  // store
  const loanAmount: number = useSelector(selectLoanAmount);
  const monthlyEmi: number = useSelector(selectMonthlyEmi);
  const interestAmount: number = useSelector(selectInterestAmount);

  const totalPaidAmount: number = useSelector(selectTotalPaidAmount);
  const completionPeriod: string = useSelector(selectCompletionPeriod);

  return (
    <Box>
      <Button
        variant="contained"
        onClick={onBackBtnClick}
        startIcon={<ExitToAppIcon />}
      >
        Modify Loan Details
      </Button>
      <Box sx={{ padding: 2 }} className={styles["loan-details__container"]}>
        <LoanAmountLabel label="Monthly EMI" value={monthlyEmi} />
        <LoanAmountLabel label="Principal Amount" value={loanAmount} />
        <LoanAmountLabel label="Total Interest" value={interestAmount} />
        <LoanAmountLabel label="Total Amount" value={totalPaidAmount} />
        <DisplayLabel label="Loan Completion" value={completionPeriod} />
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
      </Box>
    </Box>
  );
});
LoanDetails.displayName = "LoanDetails";
export { LoanDetails };
