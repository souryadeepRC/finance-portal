// types
import { AppStoreType } from "src/store/reducer-types";
import {
  LoanDetailsType,
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
  LoanStartPeriodType,
  PaymentYearDetailsType,
  prePaymentOptionsType,
  PaidAmountBreakupType,
} from "./home-loan-types";

// ====== Loan Parameter Details ======
export const selectLoanDetails = (store: AppStoreType): LoanDetailsType =>
  store?.homeLoan?.loanDetails;

export const selectLoanAmount = (store: AppStoreType): number =>
  store?.homeLoan?.loanDetails?.amount;

export const selectLoanStartPeriod = (
  store: AppStoreType
): LoanStartPeriodType => store?.homeLoan?.loanDetails?.startPeriod;
export const selectIsInValidLoanDetails = (store: AppStoreType): boolean =>
  store?.homeLoan?.loanDetails?.isError;

// ========== LOAN PAID AMOUNT DETAILS ============
export const selectLoanPaidAmountBreakup = (
  store: AppStoreType
): PaidAmountBreakupType => store?.homeLoan?.paidAmountBreakup;

export const selectMonthlyEmi = (store: AppStoreType): number =>
  store?.homeLoan?.paidAmountBreakup?.monthlyEmi;

// ======== LOAN MONTHLY & YEARLY AMORTIZATION DETAILS ========

export const selectYearlyAmortization = (store: AppStoreType): HomeLoanYearlyAmortizationType[] =>
  store?.homeLoan?.yearlyAmortizationDetails;
// ===== LOAN PAYMENT YEAR BREAKUP DETAILS ========
export const selectLoanPaymentYear = (store: AppStoreType): number =>
  store?.homeLoan?.loanPaymentYear;

export const selectPaymentYearDetails = (
  store: AppStoreType
): PaymentYearDetailsType => store?.homeLoan?.paymentYearDetails;

export const selectPaymentYearMonthlyBreakup = (
  store: AppStoreType
): HomeLoanMonthlyAmortizationType[] =>
  store?.homeLoan?.paymentYearAmortization?.monthlyBreakup;

export const selectPaymentYearAmortization = (
  store: AppStoreType
): HomeLoanYearlyAmortizationType => store?.homeLoan?.paymentYearAmortization;

// ======== LOAN PRE PAYMENT DETAILS ========
export const selectPrePaymentOptions = (
  store: AppStoreType
): prePaymentOptionsType[] => store?.homeLoan?.prePaymentOptions;
