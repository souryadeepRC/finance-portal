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
  payload?: any;
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
  loanCompletionPeriod: LoanCompletionPeriod;
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
  monthlyEmi: number;
  totalAmountPaid: number;
  loanCompletionPeriod: LoanCompletionPeriod;
};

// ------- Pre Payment Predictions
export type PrePaymentInterestDiff = {
  amount : number;
  percentage : number;
  type : string;
};
export type PrePaymentCompletionPeriodDiff = {
  month : number;
  year : number;
  type : string;
};
export type PrePaymentPrediction = {
  interestAmountDiff : PrePaymentInterestDiff
  completionPeriodDiff : PrePaymentCompletionPeriodDiff
};
export type prePaymentOptionsType = {
  prePaymentOptionId: number;
  prePaymentType: string;
  predictions : PrePaymentPrediction;
  details: prePaymentByEmiType | prePaymentByPrincipalType;
  modifiedLoanDetails: prePaymentLoanDetailsType;
};



export type prePaymentOptionsPayloadType = {
  prePaymentType: string;
  prePaymentInfo: {
    addedPrincipalAmount?: number;
    updatedEmi?: number;
  };
};

export type LoanCompletionPeriod = {
  displayText: string;
  month: number;
  year: number;
};
