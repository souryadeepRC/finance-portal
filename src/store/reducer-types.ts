import {
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
  PaymentYearDetailsType,
} from "./home-loan-reducer/home-loan-types";
export type LoanStartPeriodType = { month: number; year: number };
export type HomeLoanReducerType = {
  loanAmount: string;
  interestRate: string;
  loanTenure: string;
  monthlyEmi: number;
  loanStartPeriod: LoanStartPeriodType;
  monthlyAmortizationDetails: HomeLoanMonthlyAmortizationType[];
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
  loanPaymentYear: number;
  paymentYearDetails: PaymentYearDetailsType;
  interestAmount: number;
  totalPaidAmount: number;
  completionPeriod: string;
};
export type AppStoreType = {
  homeLoan: HomeLoanReducerType;
};
