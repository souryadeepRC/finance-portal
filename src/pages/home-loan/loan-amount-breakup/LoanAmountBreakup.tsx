import { memo } from "react";
// components
import { LoanBreakup } from "src/pages/home-loan/loan-breakup/LoanBreakup";
import { LoanAmortization } from "src/pages/home-loan/loan-amortization/LoanAmortization";
import { LoanAmountBreakupViewMobile } from "./loan-amount-breakup-view-mobile/LoanAmountBreakupViewMobile";
// hooks
import { useMedia } from "src/hooks/useMedia";

const LoanAmountBreakup = memo(() => {
  // hooks
  const isMobile: boolean = useMedia();
  if (isMobile) return <LoanAmountBreakupViewMobile />;

  return (
    <>
      <LoanBreakup />
      <LoanAmortization />
    </>
  );
});
LoanAmountBreakup.displayName = "LoanAmountBreakup";
export { LoanAmountBreakup };
