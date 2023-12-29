import {
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
} from "./home-loan-reducer/home-loan-types";

export type HomeLoanReducerType = {
  loanAmount: string;
  interestRate: string;
  loanTenure: string;
  monthlyEmi: string;
  monthlyAmortizationDetails: HomeLoanMonthlyAmortizationType[];
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
};
export type AppStoreType = {
  homeLoan: HomeLoanReducerType;
};
