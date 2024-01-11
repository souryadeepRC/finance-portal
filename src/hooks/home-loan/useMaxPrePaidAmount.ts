import { useSelector } from "react-redux";
// selectors
import { selectYearlyAmortization } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { HomeLoanYearlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types";

export const useMaxPrePaidAmount = (chosenYear: number):number => {
  // store
  const yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[] =
    useSelector(selectYearlyAmortization);
  
    const amortizationRecord: HomeLoanYearlyAmortizationType =
    yearlyAmortizationDetails?.filter(
      (amortization: HomeLoanYearlyAmortizationType) =>
        amortization.paymentYear === chosenYear
    )?.[0];

  return Math.round(amortizationRecord?.outstandingBalance) || 0;
};
