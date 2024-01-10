import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoanStartPeriod } from "src/store/home-loan-reducer/home-loan-selectors";
import { LoanStartPeriodType, PrePaidAmountType } from "src/store/home-loan-reducer/home-loan-types";
 

export const useUpdatePrePayment = (setPrePaidAmount: any) => {
  // store
  const { month, year }: LoanStartPeriodType = useSelector(
    selectLoanStartPeriod
  );
  // effects
  useEffect(() => {
    if (year === 0) return;
    setPrePaidAmount((prePaidAmount: PrePaidAmountType) => {
      return {
        ...prePaidAmount,
        month,
        year,
      };
    });
  }, [month, year, setPrePaidAmount]);
};
