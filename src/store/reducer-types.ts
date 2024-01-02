import {
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
} from "./home-loan-reducer/home-loan-types";
export type LoanStartPeriodType = { month: number; year: number };
export type HomeLoanReducerType = {
  loanAmount: string;
  interestRate: string;
  loanTenure: string;
  monthlyEmi: string;
  loanStartPeriod: LoanStartPeriodType;
  monthlyAmortizationDetails: HomeLoanMonthlyAmortizationType[];
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
};
export type AppStoreType = {
  homeLoan: HomeLoanReducerType;
};
