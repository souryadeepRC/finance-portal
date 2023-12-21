import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import { PieChart } from "@mui/x-charts/PieChart";
// components
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
// selectors
import {
  selectLoanAmount,
  selectLoanInterestRate,
  selectLoanTenure,
} from "src/store/home-loan-reducer/home-loan-selectors";
// actions
import { updateMonthlyEmi } from "src/store/home-loan-reducer/home-loan-actions";
//types
import { AppDispatch } from "src/store/store";
import { HomeLoanBreakupType } from "src/store/home-loan-reducer/home-loan-types";
// utils
import { calculateEMI } from "../home-loan-utils";
// styles
import styles from "./LoanBreakup.module.scss";

const LoanBreakup = memo((): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const loanAmount: string = useSelector(selectLoanAmount);
  const interestRate: string = useSelector(selectLoanInterestRate);
  const loanTenure: string = useSelector(selectLoanTenure);

  // compute
  const {
    monthlyEmi,
    totalAmount,
    interestAmount,
    monthlyAmortizationDetails,
    yearlyAmortizationDetails,
  }: HomeLoanBreakupType = calculateEMI(
    +loanAmount,
    +interestRate,
    +loanTenure
  );
  console.log("LoanBreakup");

  // effects
  useEffect(() => {
    dispatch(
      updateMonthlyEmi({
        monthlyEmi,
        monthlyAmortizationDetails,
        yearlyAmortizationDetails,
      })
    );
  }, [
    dispatch,
    monthlyEmi,
    monthlyAmortizationDetails,
    yearlyAmortizationDetails,
  ]);

  // return fns
  return (
    <div className={styles["loan-result__container"]}>
      {+loanTenure === 0 && <span>Please enter at least some tenure</span>}
      {+loanTenure > 0 && +loanTenure <= 30 ? (
        <div className={styles["loan-breakup__container"]}>
          <div className={styles["loan-breakup-data__container"]}>
            <LoanAmountLabel
              label="Monthly EMI"
              value={Math.round(monthlyEmi)}
            />
            <LoanAmountLabel label="Principal Amount" value={+loanAmount} />
            <LoanAmountLabel
              label="Total Interest"
              value={Math.round(interestAmount)}
            />
            <LoanAmountLabel
              label="Total Amount"
              value={Math.round(totalAmount)}
            />
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
