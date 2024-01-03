// constants
import { LoanStartPeriodType } from "../reducer-types";
import {
  UPDATE_INTEREST_RATE,
  UPDATE_LOAN_AMOUNT,
  UPDATE_LOAN_TENURE,
  UPDATE_LOAN_START_PERIOD,
  RESET_LOAN_DETAILS,
  UPDATE_LOAN_PAYMENT_DETAILS,
  UPDATE_LOAN_PAYMENT_YEAR,
} from "./home-loan-constants";
//types
import {
  HomeLoanBreakupType,
  HomeLoanReducerActionType,
} from "./home-loan-types";

export const updateLoanAmount = (
  payload: number
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_LOAN_AMOUNT,
    payload,
  };
};
export const updateInterestRate = (
  payload: number
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_INTEREST_RATE,
    payload,
  };
};
export const updateLoanTenure = (
  payload: number
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_LOAN_TENURE,
    payload,
  };
};
export const updateLoanStartPeriod = (
  payload: LoanStartPeriodType
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_LOAN_START_PERIOD,
    payload,
  };
};
export const resetLoanDetails = (): HomeLoanReducerActionType => {
  return {
    type: RESET_LOAN_DETAILS,
  };
};

export const updateLoanPaymentDetails = (
  payload: HomeLoanBreakupType
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
