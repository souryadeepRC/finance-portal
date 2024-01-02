// constants
import {
  RESET_LOAN_DETAILS,
  UPDATE_INTEREST_RATE,
  UPDATE_LOAN_AMOUNT,
  UPDATE_LOAN_START_PERIOD,
  UPDATE_LOAN_TENURE,
  UPDATE_LOAN_PAYMENT_DETAILS,
  UPDATE_LOAN_PAYMENT_YEAR,
} from "./home-loan-constants";
// types
import { HomeLoanReducerType } from "src/store/reducer-types";
import { HomeLoanReducerActionType } from "./home-loan-types";

const latestDate: Date = new Date();

const initialState: HomeLoanReducerType = {
  loanAmount: "3783000",
  interestRate: "8.5",
  loanTenure: "30",
  monthlyEmi: 0,
  loanStartPeriod: {
    month: latestDate.getMonth(),
    year: latestDate.getFullYear(),
  },
  monthlyAmortizationDetails: [],
  yearlyAmortizationDetails: [],
  loanPaymentYear: latestDate.getFullYear(),
  paymentYearDetails: {
    paymentYearList: [],
    maxYear: 0,
    minYear: 0,
  },
  interestAmount: 0,
  totalPaidAmount: 0,
  completionPeriod: "",
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
    case UPDATE_LOAN_PAYMENT_DETAILS: {
      const {
        monthlyEmi,
        yearlyAmortizationDetails,
        interestAmount,
        totalPaidAmount,
        completionPeriod,
        paymentYearDetails,
      } = payload;
      return {
        ...state,
        monthlyEmi,
        yearlyAmortizationDetails,
        interestAmount,
        totalPaidAmount,
        completionPeriod,
        paymentYearDetails,
        loanPaymentYear: state.loanStartPeriod.year
      };
    }
    case UPDATE_LOAN_PAYMENT_YEAR: {
      return {
        ...state,
        loanPaymentYear: payload,
      };
    }
    default:
      return state;
  }
};
export { HomeLoanReducer };
