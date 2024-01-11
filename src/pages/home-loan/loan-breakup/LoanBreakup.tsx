import { memo } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
// icons
import TuneIcon from "@mui/icons-material/Tune";
// common components
import { Button } from "src/components/common/button/Button";
// components
import { LoanDetails } from "src/pages/home-loan/loan-details/LoanDetails";
import { BreakupChart } from "src/pages/home-loan/loan-details/BreakupChart";
// selectors
import { selectLoanPaidAmountBreakup } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { PaidAmountBreakupType } from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./LoanBreakup.module.scss";

const LoanBreakup = memo((): JSX.Element => {
  // store
  const { principalPaid, interestPaid }: PaidAmountBreakupType = useSelector(
    selectLoanPaidAmountBreakup
  );
  // hooks
  const navigate: NavigateFunction = useNavigate();
  // fns
  const onPrePaymentClick = (): void => {
    navigate("/homeLoan/prePayment");
  };
  // return fns
  return (
    <div className={styles["loan-breakup__container"]}>
      <div className={styles["loan-breakup-amount__container"]}>
        <LoanDetails />
        <Button
          variant="contained"
          startIcon={<TuneIcon />}
          onClick={onPrePaymentClick}
        >
          Compare Pre Payment
        </Button>
      </div>
      <BreakupChart
        principalPaid={principalPaid}
        interestPaid={Math.round(interestPaid)}
      />
    </div>
  );
});
LoanBreakup.displayName = "LoanBreakup";
export { LoanBreakup };
