// type
import { MONTH_ARRAY } from "src/constants/common-constants";
import {
  HomeLoanBreakupType,
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
} from "src/store/home-loan-reducer/home-loan-types";
import { LoanStartPeriodType } from "src/store/reducer-types";

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
const getTotalPaidAmount = (
  monthlyPaymentDetails: HomeLoanMonthlyAmortizationType[],
  type: string
) => {
  return monthlyPaymentDetails.reduce(
    (total: number, paymentInfo: any) => total + paymentInfo?.[type],
    0
  );
};
const fetchLoanMonthlyBreakup = (
  loanAmount: number,
  interestRate: number,
  loanStartPeriod: LoanStartPeriodType,
  monthlyEmi: number
): HomeLoanMonthlyAmortizationType[] => {
  const MONTH_LIMIT: number = MONTH_ARRAY.length - 1;
  const monthlyRate: number = interestRate / (12 * 100);

  let monthlyBreakup: HomeLoanMonthlyAmortizationType[] = [];
  let { month, year }: LoanStartPeriodType = loanStartPeriod;
  let remainingBalance: number = loanAmount;

  while (remainingBalance > 0) {
    const interestPaid: number = remainingBalance * monthlyRate;
    const principalPaid: number = monthlyEmi - interestPaid;
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
): string => {
  if (monthlyBreakup?.length <= 0) return "";

  const {
    month: lastPaymentMonth,
    year: lastPaymentYear,
  }: HomeLoanMonthlyAmortizationType =
    monthlyBreakup[monthlyBreakup?.length - 1];
  return `${MONTH_ARRAY[lastPaymentMonth]} - ${lastPaymentYear}`;
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
    const principalPaid: number = getTotalPaidAmount(
      monthlyPaymentDetails,
      "principalPaid"
    );
    const interestPaid: number = getTotalPaidAmount(
      monthlyPaymentDetails,
      "interestPaid"
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

  const interestAmount: number = getTotalPaidAmount(monthlyBreakup, "interestPaid");
  return {
    monthlyEmi,
    yearlyAmortizationDetails,
    interestAmount: getTotalPaidAmount(monthlyBreakup, "interestPaid"),
    totalPaidAmount: loanAmount + interestAmount,
    completionPeriod: fetchLoanCompletionPeriod(monthlyBreakup),
    paymentYearDetails: {
      maxYear: paymentYearList?.[paymentYearList?.length - 1],
      minYear: paymentYearList?.[0],
    },
  };
};

export const calculateLoanAmortization = (
  loanAmount: number,
  interestRate: number,
  loanTenure: number,
  monthlyEmi: number,
  loanCreditDate: any,
  loanEmiDate: any
): any => {
  const emiDay = 31;
  let RemainingPrincipal = loanAmount;
  let calMonth = 1;
  let calYear = 2023;
  let loanCreditDay = 1;
  let loanCreditMonth = 1;
  let loanCreditYear = 2023;
  let partPeriodTotalInterestInMonth = [];
  let emiPaid = [];
  let prevPPI: any = {};
  if (loanCreditDay > emiDay) {
    const interestCalDay = new Date(
      loanCreditYear,
      loanCreditMonth,
      0
    ).getDate();

    const beforeEmiInterest = 0;
    const afterEmiDay = interestCalDay - loanCreditDay + 1; // 22;
    const afterEmiInterest = Math.round(
      RemainingPrincipal * (interestRate / 365) * (1 / 100) * afterEmiDay
    );

    partPeriodTotalInterestInMonth.push({
      beforeEmiInterest,
      afterEmiInterest,
      total: beforeEmiInterest + afterEmiInterest,
    });
    RemainingPrincipal += afterEmiInterest;
    prevPPI = {
      beforeEmiInterest,
      afterEmiInterest,
      total: beforeEmiInterest + afterEmiInterest,
    };
  } else {
    const interestCalDay = new Date(
      loanCreditYear,
      loanCreditMonth,
      0
    ).getDate();

    const beforeEmiDay = emiDay - loanCreditDay; //9;
    const afterEmiDay = interestCalDay - beforeEmiDay; // 22;
    const beforeEmiAmount = RemainingPrincipal;

    const beforeEmiInterest = Math.round(
      beforeEmiAmount * (interestRate / 365) * (1 / 100) * beforeEmiDay
    );

    const afterEmiAmount = beforeEmiAmount - monthlyEmi;
    const afterEmiInterest =
      afterEmiAmount > 0
        ? Math.round(
            afterEmiAmount * (interestRate / 365) * (1 / 100) * afterEmiDay
          )
        : 0;

    partPeriodTotalInterestInMonth.push({
      beforeEmiInterest,
      afterEmiInterest,
      total: beforeEmiInterest + afterEmiInterest,
    });
    RemainingPrincipal += beforeEmiInterest + afterEmiInterest - monthlyEmi;
    emiPaid.push({
      calMonth,
      intPaid: beforeEmiInterest,
      principalPaid: monthlyEmi - beforeEmiInterest,
    });
    prevPPI = {
      beforeEmiInterest,
      afterEmiInterest,
      total: beforeEmiInterest + afterEmiInterest,
    };
  }
  calYear = calMonth === 12 ? calYear + 1 : calYear;
  calMonth = calMonth === 12 ? 1 : calMonth + 1;

  for (let i = 0; RemainingPrincipal > 0; i++) {
    const interestCalDay = new Date(calYear, calMonth, 0).getDate();

    const beforeEmiDay = emiDay - 1; //9;
    const afterEmiDay = interestCalDay - beforeEmiDay; // 22;
    const beforeEmiAmount = RemainingPrincipal;

    const beforeEmiInterest = Math.round(
      beforeEmiAmount * (interestRate / 365) * (1 / 100) * beforeEmiDay
    );
    const afterEmiAmount = beforeEmiAmount - monthlyEmi;
    const afterEmiInterest =
      afterEmiAmount > 0
        ? Math.round(
            afterEmiAmount * (interestRate / 365) * (1 / 100) * afterEmiDay
          )
        : 0;

    partPeriodTotalInterestInMonth.push({
      beforeEmiInterest,
      afterEmiInterest,
      total: beforeEmiInterest + afterEmiInterest,
    });
    RemainingPrincipal += beforeEmiInterest + afterEmiInterest - monthlyEmi;
    const intPaid = prevPPI.afterEmiInterest + beforeEmiInterest;
    emiPaid.push({
      calMonth,
      intPaid,
      principalPaid: monthlyEmi - intPaid,
    });
    calYear = calMonth === 12 ? calYear + 1 : calYear;
    calMonth = calMonth === 12 ? 1 : calMonth + 1;
    prevPPI = {
      beforeEmiInterest,
      afterEmiInterest,
      total: beforeEmiInterest + afterEmiInterest,
    };
  }
};
