// types
import { AppStoreType } from "src/store/reducer-types";
import { HomeLoanMonthlyAmortizationType, HomeLoanYearlyAmortizationType } from "./home-loan-types";

export const selectLoanAmount = (store: AppStoreType): string => store?.homeLoan?.loanAmount;
export const selectLoanInterestRate = (store: AppStoreType): string => store?.homeLoan?.interestRate;
export const selectLoanTenure = (store: AppStoreType): string => store?.homeLoan?.loanTenure; 
export const selectMonthlyEmi = (store: AppStoreType): string => store?.homeLoan?.monthlyEmi; 
export const selectMonthlyAmortizationDetails = (store: AppStoreType): HomeLoanMonthlyAmortizationType[] => store?.homeLoan?.monthlyAmortizationDetails; 
export const selectYearlyAmortizationDetails = (store: AppStoreType): HomeLoanYearlyAmortizationType[] => store?.homeLoan?.yearlyAmortizationDetails; 
