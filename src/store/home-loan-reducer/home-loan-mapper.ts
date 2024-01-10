import {
  calculateLoanBreakup,
  fetchLoanPrePaymentDetails,
  fetchLoanPrePaymentPredictions,
} from "src/pages/home-loan/home-loan-utils";
import { PRE_PAYMENT_TYPES } from "./home-loan-constants";
import {
  HomeLoanYearlyAmortizationType,
  prePaymentOptionsType,
  LoanDetailsType,
  HomeLoanBreakupType,
  PaidAmountBreakupType,
  PrePaymentInfoType,
  PrePaymentInfoParamType,
} from "./home-loan-types";

export const mapLoanPaymentDetails = (loanDetails: LoanDetailsType) => {
  const homeLoanBreakupDetails: HomeLoanBreakupType =
    calculateLoanBreakup(loanDetails);
  const {
    paidAmountBreakup,
    monthlyEmi,
    yearlyAmortizationDetails,
    interestAmount,
    totalPaidAmount,
    loanCompletionPeriod,
    paymentYearDetails,
  } = homeLoanBreakupDetails;
  const loanPaymentYear: number = loanDetails.startPeriod.year;

  return {
    paidAmountBreakup,
    monthlyEmi,
    yearlyAmortizationDetails,
    interestAmount,
    totalPaidAmount,
    loanCompletionPeriod,
    paymentYearDetails,
    loanPaymentYear,
    ...mapPaymentYearAmortization(yearlyAmortizationDetails, loanPaymentYear),
  };
};
export const mapPaymentYearAmortization = (
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[],
  paymentYear: number
): { paymentYearAmortization: HomeLoanYearlyAmortizationType } => {
  const paymentYearAmortization: HomeLoanYearlyAmortizationType =
    yearlyAmortizationDetails?.filter(
      (details: HomeLoanYearlyAmortizationType) =>
        details.paymentYear === paymentYear
    )?.[0];

  return {
    paymentYearAmortization,
  };
};
// ========= Pre payment section ================

export const mapLoanPrePaymentOptions = (
  info: PrePaymentInfoType,
  loanDetails: LoanDetailsType,
  paidAmountBreakup: PaidAmountBreakupType,
  prePaymentOptions: prePaymentOptionsType[]
): prePaymentOptionsType[] => {
  const { type, params }: PrePaymentInfoType = info;
  const { prePaidPrincipal, updatedEmi }: PrePaymentInfoParamType = params;
  let prePaymentPaidAmountBreakup = undefined;

  const { monthlyEmi, interestPaid, completionPeriod }: PaidAmountBreakupType =
    paidAmountBreakup;

  if (
    type === PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI.value &&
    updatedEmi &&
    updatedEmi > 0
  ) {
    prePaymentPaidAmountBreakup = fetchLoanPrePaymentDetails(
      loanDetails,
      updatedEmi
    );
  } else if (
    type === PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT.value &&
    prePaidPrincipal
  ) {
    prePaymentPaidAmountBreakup = fetchLoanPrePaymentDetails(
      loanDetails,
      monthlyEmi,
      prePaidPrincipal
    );
  } else if (
    type === PRE_PAYMENT_TYPES.PRINCIPAL_AND_EMI.value &&
    updatedEmi &&
    updatedEmi > 0 &&
    prePaidPrincipal
  ) {
    prePaymentPaidAmountBreakup = fetchLoanPrePaymentDetails(
      loanDetails,
      updatedEmi,
      prePaidPrincipal
    );
  }
  if (!prePaymentPaidAmountBreakup) return prePaymentOptions;

  return [
    {
      id: prePaymentOptions?.length || 0,
      info,
      predictions: fetchLoanPrePaymentPredictions(
        prePaymentPaidAmountBreakup,
        interestPaid,
        completionPeriod
      ),
      paidAmountBreakup: prePaymentPaidAmountBreakup,
    },
    ...prePaymentOptions,
  ];
};

export const mapRemovedPrePaymentOptions = (
  id: number,
  prePaymentOptions: prePaymentOptionsType[]
): prePaymentOptionsType[] => {
  return prePaymentOptions?.filter(
    (prePaymentOption: prePaymentOptionsType) => prePaymentOption.id !== id
  );
};
