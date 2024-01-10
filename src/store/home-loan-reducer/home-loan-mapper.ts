import {
  calculateLoanBreakup,
  fetchLoanPrePaymentDetails,
  fetchLoanPrePaymentPredictions,
} from "src/pages/home-loan/home-loan-utils";
import {
  HomeLoanYearlyAmortizationType,
  prePaymentOptionsType,
  LoanDetailsType,
  HomeLoanBreakupType,
  PaidAmountBreakupType,
  PrePaymentInfoType,
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
  const { params }: PrePaymentInfoType = info;
  const { monthlyEmi, interestPaid, completionPeriod }: PaidAmountBreakupType =
    paidAmountBreakup;

  const prePaymentPaidAmountBreakup = fetchLoanPrePaymentDetails(
    loanDetails,
    monthlyEmi,
    params
  );
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
