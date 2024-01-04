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
  paymentYear: number;
  remainingYearCount: number;
  outstandingBalance: number;
  monthlyBreakup: HomeLoanMonthlyAmortizationType[];
};
export type HomeLoanMonthlyAmortizationType = {
  principalPaid: number;
  interestPaid: number;
  month: number;
  year: number;
};
export type PaymentYearDetailsType = {
  maxYear: number;
  minYear: number;
};
export type HomeLoanBreakupType = {
  monthlyEmi: number;
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
  interestAmount: number;
  totalPaidAmount: number;
  completionPeriod: string;
  paymentYearDetails: PaymentYearDetailsType;
};
export type LoanStartPeriodType = { month: number; year: number };

export type prePaymentByEmiType = {
  updatedEmi: number;
};
export type prePaymentByPrincipalType = {
  addedPrincipalAmount: number;
};
export type prePaymentLoanDetailsType = {
  principalPaid: number;
  interestPaid: number;
  totalAmountPaid: number;
  completionPeriod: string;
};
export type prePaymentOptionsType = {
  prePaymentType: string;
  details: prePaymentByEmiType | prePaymentByPrincipalType;
  modifiedLoanDetails: prePaymentLoanDetailsType;
}; 
export type prePaymentOptionsPayloadType = {
  prePaymentType: string;
  prePaymentInfo: {
    addedPrincipalAmount?: number;
    updatedEmi?: number;
  } ;
};
