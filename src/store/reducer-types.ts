import {
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
  LoanStartPeriodType,
  PaymentYearDetailsType,
  prePaymentOptionsType,
  PaidAmountBreakupType,
} from "./home-loan-reducer/home-loan-types";

export type HomeLoanReducerType = {
  loanDetails: {
    amount: number;
    interestRate: number;
    tenure: number;
    startPeriod: LoanStartPeriodType;
    isError: boolean;
  };
  paidAmountBreakup: PaidAmountBreakupType;
  monthlyAmortizationDetails: HomeLoanMonthlyAmortizationType[];
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
  loanPaymentYear: number;
  paymentYearDetails: PaymentYearDetailsType;
  paymentYearAmortization: HomeLoanYearlyAmortizationType;
  prePaymentOptions: prePaymentOptionsType[];
};
export type AppStoreType = {
  homeLoan: HomeLoanReducerType;
};
