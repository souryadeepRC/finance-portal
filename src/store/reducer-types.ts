import {
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
  LoanStartPeriodType,
  PaymentYearDetailsType,
  prePaymentOptionsType,
  LoanCompletionPeriod,
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
  paidAmountBreakup : PaidAmountBreakupType,
  monthlyEmi: number;
  monthlyAmortizationDetails: HomeLoanMonthlyAmortizationType[];
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
  loanPaymentYear: number;
  paymentYearDetails: PaymentYearDetailsType;
  interestAmount: number;
  totalPaidAmount: number;
  loanCompletionPeriod: LoanCompletionPeriod;
  paymentYearAmortization: HomeLoanYearlyAmortizationType;
  prePaymentOptions: prePaymentOptionsType[];
};
export type AppStoreType = {
  homeLoan: HomeLoanReducerType;
};
