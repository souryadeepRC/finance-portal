// constants
import {
  RESET_LOAN_DETAILS,
  UPDATE_INTEREST_RATE,
  UPDATE_LOAN_AMOUNT,
  UPDATE_LOAN_START_PERIOD,
  UPDATE_LOAN_TENURE,
  UPDATE_MONTHLY_EMI,
} from "./home-loan-constants";
// types
import { HomeLoanReducerType } from "src/store/reducer-types";
import { HomeLoanReducerActionType } from "./home-loan-types";

const initialState: HomeLoanReducerType = {
  loanAmount: "3783000",
  interestRate: "8.5",
  loanTenure: "30",
  monthlyEmi: "",
  loanStartPeriod: { month: new Date().getMonth(), year: new Date().getFullYear() },
  monthlyAmortizationDetails: [],
  yearlyAmortizationDetails: [],
};
const HomeLoanReducer = (
  state = initialState,
  { type, payload }: HomeLoanReducerActionType
): HomeLoanReducerType => {
  switch (type) {
    case UPDATE_LOAN_AMOUNT: {
      return {
        ...state,
        loanAmount: payload || "",
      };
    }
    case UPDATE_INTEREST_RATE: {
      return {
        ...state,
        interestRate: payload || "",
      };
    }
    case UPDATE_LOAN_TENURE: {
      return {
        ...state,
        loanTenure: payload || "",
      };
    }
    case UPDATE_LOAN_START_PERIOD: {
      return {
        ...state,
        loanStartPeriod: payload,
      };
    }
    case RESET_LOAN_DETAILS: {
      const { loanAmount, interestRate, loanTenure } = initialState;
      return {
        ...state,
        loanAmount,
        interestRate,
        loanTenure,
      };
    }
    case UPDATE_MONTHLY_EMI: {
      const {
        monthlyEmi,
        monthlyAmortizationDetails,
        yearlyAmortizationDetails,
      } = payload;
      return {
        ...state,
        monthlyEmi,
        monthlyAmortizationDetails,
        yearlyAmortizationDetails,
      };
    }
    default:
      return state;
  }
};
export { HomeLoanReducer };
