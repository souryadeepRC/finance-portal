import {
  calculateLoanBreakup,
  fetchLoanPrePaymentDetails,
  fetchLoanPrePaymentPredictions,
} from "src/pages/home-loan/home-loan-utils";
import { PRE_PAYMENT_TYPES } from "./home-loan-constants";
import {
  HomeLoanYearlyAmortizationType,
  prePaymentOptionsType,
  LoanStartPeriodType,
  prePaymentOptionsPayloadType,
  LoanCompletionPeriod,
  PrePaidPrincipalType,
  LoanDetailsType,
  HomeLoanBreakupType,
} from "./home-loan-types";

export const mapLoanPaymentDetails = (loanDetails: LoanDetailsType) => {
  const homeLoanBreakupDetails: HomeLoanBreakupType =
    calculateLoanBreakup(loanDetails);
  const {
    monthlyEmi,
    yearlyAmortizationDetails,
    interestAmount,
    totalPaidAmount,
    loanCompletionPeriod,
    paymentYearDetails,
  } = homeLoanBreakupDetails;
  const loanPaymentYear: number = loanDetails.startPeriod.year;
  return {
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
const mapPrePayByEmi = (
  {
    updatedEmi,
  }: {
    prePaidPrincipal?: PrePaidPrincipalType;
    updatedEmi?: number;
  },
  loanAmount: number,
  interestRate: number,
  loanStartPeriod: LoanStartPeriodType
): any | undefined => {
  if (!updatedEmi || updatedEmi === 0) return undefined;

  const modifiedLoanDetails = fetchLoanPrePaymentDetails(
    loanAmount,
    interestRate,
    loanStartPeriod,
    updatedEmi
  );
  return {
    details: { updatedEmi },
    modifiedLoanDetails,
  };
};
const mapPrePayByPrincipal = (
  {
    prePaidPrincipal,
  }: {
    prePaidPrincipal?: PrePaidPrincipalType;
    updatedEmi?: number;
  },
  loanAmount: number,
  interestRate: number,
  loanStartPeriod: LoanStartPeriodType,
  monthlyEmi: any
): any | undefined => {
  if (!prePaidPrincipal) return undefined;

  const modifiedLoanDetails = fetchLoanPrePaymentDetails(
    loanAmount,
    interestRate,
    loanStartPeriod,
    monthlyEmi,
    prePaidPrincipal
  );

  return {
    details: prePaidPrincipal,
    modifiedLoanDetails,
  };
};
export const mapLoanPrePaymentOptions = (
  { prePaymentType, prePaymentInfo }: prePaymentOptionsPayloadType,
  loanAmount: number,
  interestRate: number,
  loanStartPeriod: LoanStartPeriodType,
  monthlyEmi: any,
  prePaymentOptions: prePaymentOptionsType[],
  interestAmount: number,
  completionPeriod: LoanCompletionPeriod
): prePaymentOptionsType[] => {
  let prePaymentOption = undefined;

  if (prePaymentType === PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI) {
    prePaymentOption = mapPrePayByEmi(
      prePaymentInfo,
      loanAmount,
      interestRate,
      loanStartPeriod
    );
  } else if (prePaymentType === PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT) {
    prePaymentOption = mapPrePayByPrincipal(
      prePaymentInfo,
      loanAmount,
      interestRate,
      loanStartPeriod,
      monthlyEmi
    );
  }
  if (!prePaymentOption) return prePaymentOptions;

  return [
    {
      prePaymentOptionId: prePaymentOptions?.length || 0,
      prePaymentType,
      ...prePaymentOption,
      predictions: fetchLoanPrePaymentPredictions(
        prePaymentOption?.modifiedLoanDetails,
        interestAmount,
        completionPeriod
      ),
    },
    ...prePaymentOptions,
  ];
};

export const mapRemovedPrePaymentOptions = (
  prePaymentOptionId: number,
  prePaymentOptions: prePaymentOptionsType[]
): prePaymentOptionsType[] => {
  return prePaymentOptions?.filter(
    (prePaymentOption: prePaymentOptionsType) =>
      prePaymentOption.prePaymentOptionId !== prePaymentOptionId
  );
};
