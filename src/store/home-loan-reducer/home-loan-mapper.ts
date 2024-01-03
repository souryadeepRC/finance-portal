import { HomeLoanYearlyAmortizationType } from "./home-loan-types";

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
