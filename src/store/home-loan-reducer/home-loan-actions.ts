// constants
import {
  UPDATE_INTEREST_RATE,
  UPDATE_LOAN_AMOUNT,
  UPDATE_LOAN_TENURE,
  RESET_LOAN_DETAILS,
  UPDATE_MONTHLY_EMI,
} from "./home-loan-constants";
//types
import {
  HomeLoanReducerActionType,
  HomeLoanYearlyAmortizationType,
} from "./home-loan-types";

export const updateLoanAmount = (
  payload: string
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_LOAN_AMOUNT,
    payload,
  };
};
export const updateInterestRate = (
  payload: string
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_INTEREST_RATE,
    payload,
  };
};
export const updateLoanTenure = (
  payload: string
): HomeLoanReducerActionType => {
  return {
    type: UPDATE_LOAN_TENURE,
    payload,
  };
};
export const resetLoanDetails = (): HomeLoanReducerActionType => {
  return {
    type: RESET_LOAN_DETAILS,
  };
};

export const updateMonthlyEmi = (payload: {
  monthlyEmi: number;
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
}): HomeLoanReducerActionType => {
  return {
    type: UPDATE_MONTHLY_EMI,
    payload,
  };
};
