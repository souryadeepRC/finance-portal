import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// actions
import { updateLoanPaymentDetails } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectLoanDetails } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { LoanDetailsType } from "src/store/home-loan-reducer/home-loan-types";
import { AppDispatch } from "src/store/store";

export const usePaidAmountBreakup = (): void => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const loanDetails: LoanDetailsType = useSelector(selectLoanDetails);
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
};
