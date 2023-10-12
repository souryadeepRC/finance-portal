import { memo } from "react";
import { useSelector } from "react-redux";
// library
import { PieChart } from "@mui/x-charts/PieChart";
// selectors
import {
  selectLoanAmount,
  selectLoanInterestRate,
  selectLoanTenure,
} from "src/store/home-loan-reducer/home-loan-selectors";
// utils
import { calculateEMI } from "../home-loan-utils";
// styles
import styles from "./LoanBreakup.module.scss";
import { HomeLoanBreakupType } from "src/store/home-loan-reducer/home-loan-types";
// types
type BreakupLabelProps = {
  label: string;
  value: number;
};
const BreakupLabel = ({ label, value }: BreakupLabelProps): JSX.Element => {
  return (
    <span>
      <label className={styles["breakup-label"]}>{label} </label>
      <span>&#8377;</span>
      {value.toLocaleString("en-IN")}
    </span>
  );
};
const LoanBreakup = memo((): JSX.Element => {
  // store
  const loanAmount: string = useSelector(selectLoanAmount);
  const interestRate: string = useSelector(selectLoanInterestRate);
  const loanTenure: string = useSelector(selectLoanTenure);
 

  // compute
  const { monthlyEmi,totalAmount,interestAmount }: HomeLoanBreakupType = calculateEMI(
    +loanAmount,
    +interestRate,
    +loanTenure
  ); 
  // return fns
  return (
    <div className={styles["loan-result__container"]}>
      {+loanTenure === 0 && <span>Please enter at least some tenure</span>}
      {+loanTenure > 0 && +loanTenure <= 30 ? (
        <div className={styles["loan-breakup__container"]}>
          <div className={styles["loan-breakup-data__container"]}>
            <BreakupLabel label="Monthly EMI" value={Math.round(monthlyEmi)} />
            <BreakupLabel label="Principal Amount" value={+loanAmount} />
            <BreakupLabel label="Total Interest" value={Math.round(interestAmount)} />
            <BreakupLabel label="Total Amount" value={Math.round(totalAmount)} />
          </div>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: +loanAmount,
                    label: "Principal",
                    color: "#ebf9f5",
                  },
                  {
                    id: 1,
                    value: Math.round(interestAmount),
                    label: "Interest",
                    color: "#00b386",
                  },
                ],
              },
            ]}
            width={200}
            height={100}
          />
        </div>
      ) : (
        <span>Maximum Tenure is 30 Years</span>
      )}
    </div>
  );
});
LoanBreakup.displayName = "LoanBreakup";
export { LoanBreakup };
