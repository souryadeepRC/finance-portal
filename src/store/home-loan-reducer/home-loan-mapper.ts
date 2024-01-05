import {
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
} from "./home-loan-types";

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
  if (prePaymentType === PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI) {
    const updatedEmi = prePaymentInfo.updatedEmi || 0;
    const prePaymentOptionId: number = prePaymentOptions?.length;
    const modifiedLoanDetails = fetchLoanPrePaymentDetails(
      loanAmount,
      interestRate,
      loanStartPeriod,
      updatedEmi
    );

    const predictions = fetchLoanPrePaymentPredictions(
      modifiedLoanDetails,
      interestAmount,
      completionPeriod
    );
    console.log(predictions);
    
    return [
      {
        prePaymentOptionId,
        prePaymentType,
        details: { updatedEmi },
        predictions,
        modifiedLoanDetails,
      },
      ...prePaymentOptions,
    ];
  }
  return [];
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
