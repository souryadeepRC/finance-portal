// types
import { AppStoreType } from "src/store/reducer-types";

export const selectLoanAmount = (store: AppStoreType): string => store?.homeLoan?.loanAmount;
export const selectLoanInterestRate = (store: AppStoreType): string => store?.homeLoan?.interestRate;
export const selectLoanTenure = (store: AppStoreType): string => store?.homeLoan?.loanTenure; 

