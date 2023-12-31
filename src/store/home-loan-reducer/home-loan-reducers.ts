// mappers
import { mapPaymentYearAmortization } from "src/store/home-loan-reducer/home-loan-mapper";
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
  completionPeriod: "",
  paymentYearAmortization: {
    principalPaid: 0,
    interestPaid: 0,
    paymentYear: 0,
    remainingYearCount: 0,
    outstandingBalance: 0,
    monthlyBreakup: [],
  },
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
        completionPeriod,
        paymentYearDetails,
      } = payload;
      const loanPaymentYear: number = state.loanStartPeriod.year;
      return {
        ...state,
        monthlyEmi,
        yearlyAmortizationDetails,
        interestAmount,
        totalPaidAmount,
        completionPeriod,
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
    default:
      return state;
  }
};
export { HomeLoanReducer };
