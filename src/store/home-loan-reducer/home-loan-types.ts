export type UpdateLoanInfoType = {
  field: string;
  value: string;
};

/* export type HomeLoanReducerPayloadType = {
  loanAmount?: string;
  interestRate?: string;
  loanTenure?: string;
  monthlyEmi?: Number;
} */
export type HomeLoanReducerActionType = {
  type: string;
  payload?: string | any;
};

export type HomeLoanInputType = {
  enteredId: string;
  enteredValue: string;
};
export type HomeLoanYearlyAmortizationType = {
  principalPaid: number;
  interestPaid: number;
  year: number;
  totalPrincipalPaid: number;
  monthlyBreakup: HomeLoanMonthlyAmortizationType[];
};
export type HomeLoanMonthlyAmortizationType = {
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
  month: number;
};
export type HomeLoanBreakupType = {
  monthlyEmi: number;
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
  interestAmount: number;
  totalAmount: number;
};
