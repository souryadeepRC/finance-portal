import {
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
  LoanStartPeriodType,
  PaymentYearDetailsType,
  prePaymentOptionsType,
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
  completionPeriod: string;
  paymentYearAmortization: HomeLoanYearlyAmortizationType;
  prePaymentOptions:prePaymentOptionsType[];
};
export type AppStoreType = {
  homeLoan: HomeLoanReducerType;
};
