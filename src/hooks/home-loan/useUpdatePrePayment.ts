import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectLoanStartPeriod,
  selectMonthlyEmi,
} from "src/store/home-loan-reducer/home-loan-selectors";
import {
  LoanStartPeriodType,
  PrePaidAmountType,
} from "src/store/home-loan-reducer/home-loan-types";

export const useUpdatePrePayment = (
  setPrePaidAmount: any,
  isPayByEmi?: boolean
): void => {
  // store
  const monthlyEmi: number = Math.round(useSelector(selectMonthlyEmi));
  const { month, year }: LoanStartPeriodType = useSelector(
    selectLoanStartPeriod
  );
  // effects
  useEffect(() => {
    if (year === 0) return;
    setPrePaidAmount((prePaidAmount: PrePaidAmountType) => {
      return {
        ...prePaidAmount,
        amount: isPayByEmi ? monthlyEmi : 1000,
        month,
        year,
      };
    });
  }, [monthlyEmi, isPayByEmi, month, year, setPrePaidAmount]);
};
