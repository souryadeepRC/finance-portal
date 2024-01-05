// mappers
import {
  mapPaymentYearAmortization,
  mapLoanPrePaymentOptions,
  mapRemovedPrePaymentOptions,
} from "src/store/home-loan-reducer/home-loan-mapper";
// constants
import {
  RESET_LOAN_DETAILS,
  UPDATE_INTEREST_RATE,
  UPDATE_LOAN_AMOUNT,
  UPDATE_LOAN_START_PERIOD,
  UPDATE_LOAN_TENURE,
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
  loanAmount: 3783000,
  interestRate: 8.5,
  loanTenure: 30,
  monthlyEmi: 0,
  loanStartPeriod: {
    month: latestDate.getMonth(),
    year: latestDate.getFullYear(),
  },
  monthlyAmortizationDetails: [],
  yearlyAmortizationDetails: [],
  loanPaymentYear: latestDate.getFullYear(),
  paymentYearDetails: {
    maxYear: 0,
    minYear: 0,
  },
  interestAmount: 0,
  totalPaidAmount: 0,
  loanCompletionPeriod: { displayText: "", month: 0, year: 0 },
  paymentYearAmortization: {
    principalPaid: 0,
    interestPaid: 0,
    paymentYear: 0,
    remainingYearCount: 0,
    outstandingBalance: 0,
    monthlyBreakup: [],
  },
  prePaymentOptions: [] // fetchPrePaymentOptionsTestData(),
};
const HomeLoanReducer = (
  state = initialState,
  { type, payload }: HomeLoanReducerActionType
): HomeLoanReducerType => {
  switch (type) {
    case UPDATE_LOAN_AMOUNT: {
      return {
        ...state,
        loanAmount: payload || 0,
      };
    }
    case UPDATE_INTEREST_RATE: {
      return {
        ...state,
        interestRate: payload || 0,
      };
    }
    case UPDATE_LOAN_TENURE: {
      return {
        ...state,
        loanTenure: payload || 0,
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
        loanCompletionPeriod,
        paymentYearDetails,
      } = payload;
      const loanPaymentYear: number = state.loanStartPeriod.year;
      return {
        ...state,
        monthlyEmi,
        yearlyAmortizationDetails,
        interestAmount,
        totalPaidAmount,
        loanCompletionPeriod,
        paymentYearDetails,
        loanPaymentYear: loanPaymentYear,
        ...mapPaymentYearAmortization(
          yearlyAmortizationDetails,
          loanPaymentYear
        ),
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
      const {
        loanAmount,
        interestRate,
        monthlyEmi,
        loanStartPeriod,
        prePaymentOptions,
        interestAmount,
        loanCompletionPeriod,
      } = state;

      return {
        ...state,
        prePaymentOptions: mapLoanPrePaymentOptions(
          payload,
          loanAmount,
          interestRate,
          loanStartPeriod,
          monthlyEmi,
          prePaymentOptions,
          interestAmount,
          loanCompletionPeriod
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
