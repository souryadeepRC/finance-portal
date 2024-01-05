import { fetchLoanPrePaymentDetails } from "src/pages/home-loan/home-loan-utils";
import { PRE_PAYMENT_TYPES } from "./home-loan-constants";
import {
  HomeLoanYearlyAmortizationType,
  prePaymentOptionsType,
  LoanStartPeriodType,
  prePaymentOptionsPayloadType,
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
  prePaymentOptions: prePaymentOptionsType[]
): prePaymentOptionsType[] => {
  if (prePaymentType === PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI) {
    const updatedEmi = prePaymentInfo.updatedEmi || 0;
    const prePaymentOptionId: number = prePaymentOptions?.length;
    return [
      {
        prePaymentOptionId,
        prePaymentType,
        details: { updatedEmi },
        modifiedLoanDetails: fetchLoanPrePaymentDetails(
          loanAmount,
          interestRate,
          loanStartPeriod,
          updatedEmi
        ),
      },...prePaymentOptions,
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
