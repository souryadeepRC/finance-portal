import { useSelector } from "react-redux";
// library
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from "@mui/material";
// components
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
//selectors
import { selectLoanAmount } from "src/store/home-loan-reducer/home-loan-selectors";
// styles
import styles from "./YearlyAmortization.module.scss";

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number }
): JSX.Element => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.warning"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};
type YearlyAmortizationProps = {
  principalPaid: number;
  interestPaid: number;
  totalPrincipalPaid: number;
};
const YearlyAmortization = ({
  principalPaid,
  interestPaid,
  totalPrincipalPaid,
}: YearlyAmortizationProps): JSX.Element => {
  const loanAmount: string = useSelector(selectLoanAmount);
  const percentage: number = (totalPrincipalPaid / +loanAmount) * 100;

  return (
    <div className={styles["amortization-amount__container"]}>
      <div className={styles["paid-amount__container"]}>
        <LoanAmountLabel
          label="Principal Paid"
          value={Math.round(principalPaid)}
        />
        <LoanAmountLabel
          label="Interest Paid"
          value={Math.round(interestPaid)}
        />
      </div>
      <div className={styles["recovered-amount__container"]}>
        <LoanAmountLabel
          label="Loan Recovered"
          value={Math.round(totalPrincipalPaid)}
        />
        <CircularProgressWithLabel value={percentage} />
      </div>
    </div>
  );
};
export { YearlyAmortization };
