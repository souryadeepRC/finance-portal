// constants
import { MONTH_ARRAY } from "src/constants/common-constants";
import {
  PRE_PAYMENT_COMPLETION_PERIOD_DIFF_TYPES,
  PRE_PAYMENT_INTEREST_DIFF_TYPES,
} from "src/store/home-loan-reducer/home-loan-constants";
// types
import {
  HomeLoanBreakupType,
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
  LoanCompletionPeriod,
  PrePaymentPrediction,
  prePaymentLoanDetailsType,
} from "src/store/home-loan-reducer/home-loan-types";
import { LoanStartPeriodType } from "src/store/home-loan-reducer/home-loan-types";
// utils
import { getMonthDifference } from "src/utils/date-utils";

const calculateMonthlyEmi = (
  loanAmount: number,
  interestRate: number,
  loanTenure: number
): number => {
  const tenureInMonth: number = loanTenure * 12;
  const monthlyRate: number = interestRate / (12 * 100);

  const monthlyEmi: number =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonth)) /
    (Math.pow(1 + monthlyRate, tenureInMonth) - 1);

  return monthlyEmi;
};

const fetchTotalPaidAmount = (
  monthlyPaymentDetails: HomeLoanMonthlyAmortizationType[]
) => {
  return monthlyPaymentDetails.reduce(
    (total: any, paymentInfo: any) => {
      return {
        principalPaid: total.principalPaid + paymentInfo?.principalPaid,
        interestPaid: total.interestPaid + paymentInfo?.interestPaid,
      };
    },
    { principalPaid: 0, interestPaid: 0 }
  );
};

const fetchLoanMonthlyBreakup = (
  loanAmount: number,
  interestRate: number,
  loanStartPeriod: LoanStartPeriodType,
  monthlyEmi: number,
  prePaidPrincipal?: {
    amount: number;
    incrementFactor?: number;
    month?: number;
  },
): HomeLoanMonthlyAmortizationType[] => {
  const MONTH_LIMIT: number = MONTH_ARRAY.length - 1;
  const monthlyRate: number = interestRate / (12 * 100);

  let monthlyBreakup: HomeLoanMonthlyAmortizationType[] = [];
  let { month, year }: LoanStartPeriodType = loanStartPeriod;
  let remainingBalance: number = loanAmount;
  let prePaidPrincipalAmount: number = prePaidPrincipal?.amount || 0;
  while (remainingBalance > 0) {
    if (prePaidPrincipal) {
      if (month === prePaidPrincipal?.month) {
        remainingBalance = remainingBalance - prePaidPrincipalAmount;
        const incrementalFactor: number =
          prePaidPrincipal?.incrementFactor || 0;
        prePaidPrincipalAmount =
          prePaidPrincipalAmount * (1 + incrementalFactor);
      }
    }

    const interestPaid: number = remainingBalance * monthlyRate;
    const principalPortion: number = monthlyEmi - interestPaid;

    const principalPaid: number =
      remainingBalance > principalPortion ? principalPortion : remainingBalance;
    remainingBalance = remainingBalance - principalPaid;

    monthlyBreakup.push({
      principalPaid,
      interestPaid,
      month,
      year,
    });
    if (month === MONTH_LIMIT) {
      month = 0;
      year = year + 1;
    } else {
      month = month + 1;
    }
  }

  return monthlyBreakup;
};

const fetchLoanCompletionPeriod = (
  monthlyBreakup: HomeLoanMonthlyAmortizationType[]
): LoanCompletionPeriod => {
  if (monthlyBreakup?.length <= 0)
    return {
      displayText: ``,
      month: 0,
      year: 0,
    };

  const {
    month: lastPaymentMonth,
    year: lastPaymentYear,
  }: HomeLoanMonthlyAmortizationType =
    monthlyBreakup[monthlyBreakup?.length - 1];
  return {
    displayText: `${MONTH_ARRAY[lastPaymentMonth]} - ${lastPaymentYear}`,
    month: lastPaymentMonth,
    year: lastPaymentYear,
  };
};

export const calculateLoanBreakup = (
  loanAmount: number,
  interestRate: number,
  loanTenure: number,
  loanStartPeriod: LoanStartPeriodType
): HomeLoanBreakupType => {
  // calculate EMI
  const monthlyEmi: number = calculateMonthlyEmi(
    loanAmount,
    interestRate,
    loanTenure
  );
  // Find Monthly Payment Breakup
  const monthlyBreakup: HomeLoanMonthlyAmortizationType[] =
    fetchLoanMonthlyBreakup(
      loanAmount,
      interestRate,
      loanStartPeriod,
      monthlyEmi
    );

  const paymentYearList: number[] = Array.from(
    new Set(monthlyBreakup.map((monthlyData) => monthlyData.year))
  ).sort((a: number, b: number) => a - b);

  let outstandingBalance: number = loanAmount;
  const yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[] = [];

  paymentYearList.forEach((paymentYear: number, index: number) => {
    const monthlyPaymentDetails: HomeLoanMonthlyAmortizationType[] =
      monthlyBreakup?.filter(
        (paymentInfo: any) => paymentInfo.year === paymentYear
      );

    const { principalPaid, interestPaid } = fetchTotalPaidAmount(
      monthlyPaymentDetails
    );
    outstandingBalance = outstandingBalance - principalPaid;

    yearlyAmortizationDetails.push({
      principalPaid,
      interestPaid,
      paymentYear,
      remainingYearCount: paymentYearList?.length - index - 1,
      outstandingBalance: outstandingBalance < 0 ? 0 : outstandingBalance,
      monthlyBreakup: monthlyPaymentDetails,
    });
  });

  const { interestPaid } = fetchTotalPaidAmount(monthlyBreakup);
  return {
    monthlyEmi,
    yearlyAmortizationDetails,
    interestAmount: interestPaid,
    totalPaidAmount: loanAmount + interestPaid,
    loanCompletionPeriod: fetchLoanCompletionPeriod(monthlyBreakup),
    paymentYearDetails: {
      maxYear: paymentYearList?.[paymentYearList?.length - 1],
      minYear: paymentYearList?.[0],
    },
  };
};

export const fetchLoanPrePaymentDetails = (
  loanAmount: number,
  interestRate: number,
  loanStartPeriod: LoanStartPeriodType,
  monthlyEmi: number
): prePaymentLoanDetailsType => {
  const monthlyBreakup: HomeLoanMonthlyAmortizationType[] =
    fetchLoanMonthlyBreakup(
      loanAmount,
      interestRate,
      loanStartPeriod,
      monthlyEmi
    );

  const { principalPaid, interestPaid } = fetchTotalPaidAmount(monthlyBreakup);

  return {
    principalPaid,
    interestPaid,
    monthlyEmi,
    totalAmountPaid: principalPaid + interestPaid,
    loanCompletionPeriod: fetchLoanCompletionPeriod(monthlyBreakup),
  };
};

export const fetchLoanPrePaymentPredictions = (
  { interestPaid, loanCompletionPeriod }: prePaymentLoanDetailsType,
  interestAmount: number,
  completionPeriod: LoanCompletionPeriod
): PrePaymentPrediction => {
  const interestDiff: number = interestAmount - interestPaid;
  const modifiedInterestDiff: number = Math.abs(interestDiff);
  const interestDiffPercentage: number =
    (modifiedInterestDiff / interestAmount) * 100;

  const monthDifference: number = getMonthDifference(
    new Date(loanCompletionPeriod.year, loanCompletionPeriod.month),
    new Date(completionPeriod.year, completionPeriod.month)
  );

  return {
    interestAmountDiff: {
      amount: Math.round(Math.abs(interestDiff)),
      percentage: +Number(interestDiffPercentage).toFixed(2),
      type:
        interestDiff > 0
          ? PRE_PAYMENT_INTEREST_DIFF_TYPES.LESSER
          : PRE_PAYMENT_INTEREST_DIFF_TYPES.GREATER,
    },
    completionPeriodDiff: {
      month: monthDifference % 12,
      year: Math.round(monthDifference / 12),
      type:
        monthDifference > 0
          ? PRE_PAYMENT_COMPLETION_PERIOD_DIFF_TYPES.EARLIER
          : PRE_PAYMENT_COMPLETION_PERIOD_DIFF_TYPES.LATER,
    },
  };
};
