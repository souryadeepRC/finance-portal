import { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// library
import { Box } from "@mui/material";
// icons
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// common components
import { Button } from "src/components/common/button/Button";
// components
import { LoanAmountInfo } from "src/pages/home-loan/pre-payment-view/loan-amount-info/LoanAmountInfo";
// selectors
import {
  selectCompletionPeriod,
  selectInterestAmount,
  selectLoanAmount,
  selectMonthlyEmi,
  selectTotalPaidAmount,
} from "src/store/home-loan-reducer/home-loan-selectors";

const LoanDetails = memo((): JSX.Element => {
  // hooks
  const navigate = useNavigate();
  // fns
  const onBackBtnClick = () => {
    navigate("/homeLoan");
  };
  // store
  const principalPaid: number = useSelector(selectLoanAmount);
  const monthlyEmi: number = useSelector(selectMonthlyEmi);
  const interestPaid: number = useSelector(selectInterestAmount);
  const totalAmountPaid: number = useSelector(selectTotalPaidAmount);
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
      <LoanAmountInfo
        loanAmountInfo={{
          principalPaid,
          interestPaid,
          monthlyEmi,
          totalAmountPaid,
          completionPeriod,
        }}
      />
    </Box>
  );
});
LoanDetails.displayName = "LoanDetails";
export { LoanDetails };
