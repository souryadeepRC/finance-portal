// ====== Loan Parameter Details ======

export type LoanStartPeriodType = { month: number; year: number };

export type LoanDetailsPayloadType = {
  amount?: number;
  interestRate?: number;
  tenure?: number;
  startPeriod?: LoanStartPeriodType;
  isError: boolean;
};

export type LoanDetailsType = {
  amount: number;
  interestRate: number;
  tenure: number;
  startPeriod: LoanStartPeriodType;
  isError: boolean;
};

export type UpdateLoanInfoType = {
  field: string;
  value: string;
};

// ====== Loan Paid Amount  Breakup

export type PaidAmountBreakupType = {
  monthlyEmi: number;
  principalPaid: number;
  interestPaid: number;
  totalPaidAmount: number;
  completionPeriod: LoanCompletionPeriod;
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
export type HomeLoanAmountBreakup = {
  monthlyBreakup: HomeLoanMonthlyAmortizationType[];
  totalPrincipalPaid: number;
  totalInterestPaid: number;
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
  paidAmountBreakup: PaidAmountBreakupType;
  monthlyEmi: number;
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[];
  interestAmount: number;
  totalPaidAmount: number;
  loanCompletionPeriod: LoanCompletionPeriod;
  paymentYearDetails: PaymentYearDetailsType;
};

export type prePaymentByEmiType = {
  updatedEmi: number;
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
  amount: number;
  percentage: number;
  type: string;
};
export type PrePaymentCompletionPeriodDiff = {
  month: number;
  year: number;
  type: string;
};
export type PrePaymentPrediction = {
  interestAmountDiff: PrePaymentInterestDiff;
  completionPeriodDiff: PrePaymentCompletionPeriodDiff;
};

// ------------  Pre Paid
export type PrePaidAmountType = {
  amount: number;
  incrementFactor?: number;
  month: number;
  year: number;
};

export type PrePaymentInfoType = {
  type: string;
  params: PrePaymentInfoParamType;
};
export type PrePaymentInfoParamType = {
  prePaidPrincipal?: PrePaidAmountType;
  prePaidEmi?: PrePaidAmountType;
};
export type prePaymentOptionsType = {
  id: number;
  info: PrePaymentInfoType;
  predictions: PrePaymentPrediction;
  paidAmountBreakup: PaidAmountBreakupType;
};

// --------------

export type prePaymentOptionsPayloadType = {
  prePaymentType: string;
  prePaymentInfo: PrePaymentInfoType;
};

export type LoanCompletionPeriod = {
  displayText: string;
  month: number;
  year: number;
};
