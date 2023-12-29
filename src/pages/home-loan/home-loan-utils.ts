// type
import {
  HomeLoanBreakupType,
  HomeLoanMonthlyAmortizationType,
  HomeLoanYearlyAmortizationType,
} from "src/store/home-loan-reducer/home-loan-types";

export const calculateEMI = (
  loanAmount: number,
  interestRate: number,
  loanTenure: number
): HomeLoanBreakupType => {
  const tenureInMonth: number = loanTenure * 12;
  const monthlyRate: number = interestRate / (12 * 100);

  const monthlyEmi: number =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonth)) /
    (Math.pow(1 + monthlyRate, tenureInMonth) - 1);

  let remainingBalance: number = loanAmount;
  let interestAmount: number = 0;
  let monthlyBreakup: HomeLoanMonthlyAmortizationType[] = [];
  const yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[] = [];
  let latestYear: number = new Date().getFullYear();
  let yearlyPrincipalPaid: number = 0;
  let yearlyInterestPaid: number = 0;
  let totalPrincipalPaid: number = 0;
  for (let month: number = 1; remainingBalance > 0; month++) {
    const interestPaid: number = remainingBalance * monthlyRate;
    const principalPaid: number = monthlyEmi - interestPaid;
    remainingBalance = remainingBalance - principalPaid;
    monthlyBreakup.push({
      principalPaid,
      interestPaid,
      remainingBalance,
      month,
    });
    yearlyPrincipalPaid += principalPaid;
    yearlyInterestPaid += interestPaid;
    if (month === 12) {
      totalPrincipalPaid += yearlyPrincipalPaid;
      yearlyAmortizationDetails.push({
        principalPaid:yearlyPrincipalPaid,
        interestPaid:yearlyInterestPaid,
        year: latestYear,
        totalPrincipalPaid,
        monthlyBreakup
      });

      month = 0;
      latestYear++;
      yearlyPrincipalPaid = 0;
      yearlyInterestPaid = 0;
      monthlyBreakup=[];
    }

    interestAmount += interestPaid;
  }

  return {
    monthlyEmi,
    yearlyAmortizationDetails,
    interestAmount,
    totalAmount: loanAmount + interestAmount,
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
