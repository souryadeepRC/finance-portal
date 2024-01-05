// types
import { AppStoreType } from "src/store/reducer-types";
import {
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
  LoanCompletionPeriod,
  LoanStartPeriodType,
  PaymentYearDetailsType,
  prePaymentOptionsType
} from "./home-loan-types";

export const selectLoanAmount = (store: AppStoreType): number =>
  store?.homeLoan?.loanAmount;
export const selectLoanInterestRate = (store: AppStoreType): number =>
  store?.homeLoan?.interestRate;
export const selectLoanTenure = (store: AppStoreType): number =>
  store?.homeLoan?.loanTenure;
export const selectMonthlyEmi = (store: AppStoreType): number =>
  store?.homeLoan?.monthlyEmi;
export const selectLoanStartPeriod = (
  store: AppStoreType
): LoanStartPeriodType => store?.homeLoan?.loanStartPeriod;
export const selectMonthlyAmortizationDetails = (
  store: AppStoreType
): HomeLoanMonthlyAmortizationType[] =>
  store?.homeLoan?.monthlyAmortizationDetails;
export const selectYearlyAmortizationDetails = (
  store: AppStoreType
): HomeLoanYearlyAmortizationType[] =>
  store?.homeLoan?.yearlyAmortizationDetails;
export const selectLoanPaymentYear = (store: AppStoreType): number =>
  store?.homeLoan?.loanPaymentYear;
export const selectPaymentYearDetails = (
  store: AppStoreType
): PaymentYearDetailsType => store?.homeLoan?.paymentYearDetails;

export const selectTotalPaidAmount = (
  store: AppStoreType
): number => store?.homeLoan?.totalPaidAmount;

export const selectLoanCompletionPeriod = (store: AppStoreType): LoanCompletionPeriod =>
  store?.homeLoan?.loanCompletionPeriod;
  
export const selectLoanCompletionPeriodText = (store: AppStoreType): string =>
  store?.homeLoan?.loanCompletionPeriod?.displayText;

export const selectInterestAmount = (store: AppStoreType): number =>
  store?.homeLoan?.interestAmount;

  
export const selectPaymentYearMonthlyBreakup = (store: AppStoreType): HomeLoanMonthlyAmortizationType[] =>
store?.homeLoan?.paymentYearAmortization?.monthlyBreakup;

export const selectPaymentYearAmortization = (store: AppStoreType): HomeLoanYearlyAmortizationType =>
store?.homeLoan?.paymentYearAmortization;
export const selectPrePaymentOptions = (store: AppStoreType): prePaymentOptionsType[] =>
store?.homeLoan?.prePaymentOptions;
