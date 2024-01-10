// constants
import { LoanDetailsType, PrePaymentInfoType } from "./home-loan-types";
import {
  UPDATE_LOAN_DETAILS,
  RESET_LOAN_DETAILS,
  UPDATE_LOAN_PAYMENT_DETAILS,
  UPDATE_LOAN_PAYMENT_YEAR,
  UPDATE_LOAN_PRE_PAYMENT_OPTIONS,
  REMOVE_PRE_PAYMENT_OPTION,
} from "./home-loan-constants";
//types
import {
  LoanDetailsPayloadType,
  HomeLoanReducerActionType,
} from "./home-loan-types";

export const updateLoanDetails = (payload: LoanDetailsPayloadType): HomeLoanReducerActionType => {
  return {
    type: UPDATE_LOAN_DETAILS,
    payload,
  };
};

export const resetLoanDetails = (): HomeLoanReducerActionType => {
  return {
    type: RESET_LOAN_DETAILS,
  };
};

export const updateLoanPaymentDetails = (
  payload: LoanDetailsType
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_LOAN_PAYMENT_DETAILS,
    payload,
  };
};
export const updateLoanPaymentYear = (
  payload: number
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_LOAN_PAYMENT_YEAR,
    payload,
  };
};
export const updatePrePaymentOptions = (
  payload: PrePaymentInfoType
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_LOAN_PRE_PAYMENT_OPTIONS,
    payload,
  };
};

export const removePrePaymentOption = (
  payload: number
): HomeLoanReducerActionType => {
  return {
    type: REMOVE_PRE_PAYMENT_OPTION,
    payload,
  };
};
