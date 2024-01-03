import {
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
  PaymentYearDetailsType,
} from "./home-loan-reducer/home-loan-types";
export type LoanStartPeriodType = { month: number; year: number };
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
};
export type AppStoreType = {
  homeLoan: HomeLoanReducerType;
};
