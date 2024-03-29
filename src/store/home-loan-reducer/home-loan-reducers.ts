// mappers
import {
  mapPaymentYearAmortization,
  mapLoanPrePaymentOptions,
  mapRemovedPrePaymentOptions,
  mapLoanPaymentDetails,
} from "src/store/home-loan-reducer/home-loan-mapper";
// constants
import {
  UPDATE_LOAN_DETAILS,
  RESET_LOAN_DETAILS,
  UPDATE_LOAN_PAYMENT_DETAILS,
  UPDATE_LOAN_PAYMENT_YEAR,
  UPDATE_LOAN_PRE_PAYMENT_OPTIONS,
  REMOVE_PRE_PAYMENT_OPTION,
} from "./home-loan-constants";
// types
import { HomeLoanReducerType } from "src/store/reducer-types";
import { HomeLoanReducerActionType } from "./home-loan-types";

const latestDate: Date = new Date();

const initialState: HomeLoanReducerType = {
  loanDetails: {
    amount: 5000000,
    interestRate: 8.5,
    tenure: 30,
    startPeriod: {
      month: latestDate.getMonth(),
      year: latestDate.getFullYear(),
    },
    isError: false,
  },
  paidAmountBreakup: {
    monthlyEmi: 0,
    principalPaid: 0,
    interestPaid: 0,
    totalPaidAmount: 0,
    completionPeriod: { displayText: "", month: 0, year: 0 },
  },
  monthlyAmortizationDetails: [],
  yearlyAmortizationDetails: [],
  loanPaymentYear: latestDate.getFullYear(),
  paymentYearDetails: {
    maxYear: 0,
    minYear: 0,
  },
  paymentYearAmortization: {
    principalPaid: 0,
    interestPaid: 0,
    paymentYear: 0,
    remainingYearCount: 0,
    outstandingBalance: 0,
    monthlyBreakup: [],
  },
  prePaymentOptions: [],
};
const HomeLoanReducer = (
  state = initialState,
  { type, payload }: HomeLoanReducerActionType
): HomeLoanReducerType => {
  switch (type) {
    case UPDATE_LOAN_DETAILS: {
      const { loanDetails } = state;
      return {
        ...state,
        loanDetails: {
          ...loanDetails,
          ...payload,
        },
      };
    }
    case RESET_LOAN_DETAILS: {
      const { loanDetails } = initialState;
      return {
        ...state,
        loanDetails,
      };
    }
    case UPDATE_LOAN_PAYMENT_DETAILS: {
      return {
        ...state,
        ...mapLoanPaymentDetails(payload),
      };
    }
    case UPDATE_LOAN_PAYMENT_YEAR: {
      const { yearlyAmortizationDetails } = state;
      const loanPaymentYear: number = payload;
      return {
        ...state,
        loanPaymentYear,
        ...mapPaymentYearAmortization(
          yearlyAmortizationDetails,
          loanPaymentYear
        ),
      };
    }
    case UPDATE_LOAN_PRE_PAYMENT_OPTIONS: {
      const { loanDetails, paidAmountBreakup, prePaymentOptions } = state;
      return {
        ...state,
        prePaymentOptions: mapLoanPrePaymentOptions(
          payload,
          loanDetails,
          paidAmountBreakup,
          prePaymentOptions
        ),
      };
    }
    case REMOVE_PRE_PAYMENT_OPTION: {
      const { prePaymentOptions } = state;
      return {
        ...state,
        prePaymentOptions: mapRemovedPrePaymentOptions(
          payload,
          prePaymentOptions
        ),
      };
    }
    default:
      return state;
  }
};
export { HomeLoanReducer };
