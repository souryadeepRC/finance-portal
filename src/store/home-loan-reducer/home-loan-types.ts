export type UpdateLoanInfoType = {
  field: string;
  value: string;
};

export type HomeLoanReducerActionType = {
  type: string;
  payload?: string;
};

export type HomeLoanInputType = {
  enteredId: string;
  enteredValue: string;
};
export type HomeLoanAmortizationType = {
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
};
export type HomeLoanBreakupType = {
  monthlyEmi: number;
  amortizationDetails: HomeLoanAmortizationType[];
  interestAmount: number;
  totalAmount: number;
};
