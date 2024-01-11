import { memo } from "react";
import { useSelector } from "react-redux";
// components
import { LoanBreakup } from "src/pages/home-loan/loan-breakup/LoanBreakup";
import { LoanAmortization } from "src/pages/home-loan/loan-amortization/LoanAmortization";
import { LoanPaymentBreakupMobile } from "./LoanPaymentBreakupMobile";
// hooks
import { useMedia } from "src/hooks/useMedia";
import { usePaidAmountBreakup } from "src/hooks/home-loan/usePaidAmountBreakup";
// selectors
import { selectIsInValidLoanDetails } from "src/store/home-loan-reducer/home-loan-selectors";

const LoanPaymentBreakup = memo((): JSX.Element => {
  const isInValidLoanDetails: boolean = useSelector(selectIsInValidLoanDetails);
  // hooks
  const isMobile: boolean = useMedia();
  usePaidAmountBreakup();

  if (isInValidLoanDetails) return <></>;

  if (isMobile) return <LoanPaymentBreakupMobile />;
  return (
    <>
      <LoanBreakup />
      <LoanAmortization />
    </>
  );
});
LoanPaymentBreakup.displayName = "LoanPaymentBreakup";
export { LoanPaymentBreakup };
