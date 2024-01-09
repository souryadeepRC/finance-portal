import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import { LoanBreakup } from "src/pages/home-loan/loan-breakup/LoanBreakup";
import { LoanAmortization } from "src/pages/home-loan/loan-amortization/LoanAmortization";
import { LoanAmountBreakupViewMobile } from "./loan-amount-breakup-view-mobile/LoanAmountBreakupViewMobile";
// hooks
import { useMedia } from "src/hooks/useMedia";
// actions
import { updateLoanPaymentDetails } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectLoanDetails } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { LoanDetailsType } from "src/store/home-loan-reducer/home-loan-types";
import { AppDispatch } from "src/store/store";

const LoanAmountBreakup = memo(() => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const loanDetails: LoanDetailsType = useSelector(selectLoanDetails);
  // hooks
  const isMobile: boolean = useMedia();

  // effects
  useEffect(() => {
    let paymentDetailsTimer: ReturnType<typeof setTimeout>;
    if (!loanDetails?.isError) {
      paymentDetailsTimer = setTimeout(() => {
        dispatch(updateLoanPaymentDetails(loanDetails));
      }, 250);
    }
    return () => {
      paymentDetailsTimer && clearTimeout(paymentDetailsTimer);
    };
  }, [dispatch, loanDetails]);

  if (loanDetails?.isError) {
    return <></>;
  }
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
