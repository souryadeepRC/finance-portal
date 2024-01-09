import {
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
  LoanStartPeriodType,
  PaymentYearDetailsType,
  prePaymentOptionsType,
  LoanCompletionPeriod
} from "./home-loan-reducer/home-loan-types";
export type HomeLoanReducerType = {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
  monthlyEmi: number;
  loanStartPeriod: LoanStartPeriodType;
  monthlyAmortizationDetails: HomeLoanMonthlyAmortizationType[];
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
  loanPaymentYear: number;
  paymentYearDetails: PaymentYearDetailsType;
  interestAmount: number;
  totalPaidAmount: number;
  loanCompletionPeriod: LoanCompletionPeriod;
  paymentYearAmortization: HomeLoanYearlyAmortizationType;
  prePaymentOptions:prePaymentOptionsType[];
};
export type AppStoreType = {
  homeLoan: HomeLoanReducerType;
};
