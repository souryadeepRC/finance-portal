// types
import { PrePaidAmountType } from "src/store/home-loan-reducer/home-loan-types";
import { ObjectStringType } from "src/types/common-types";

export const PRE_PAY_AMOUNT_INITIAL_STATE: PrePaidAmountType = {
  amount: 0,
  month: 0,
  year: 0,
};

export const PRE_PAYMENT_TYPES = {
  PAY_PRINCIPAL_AMOUNT: {
    value: "PAY_PRINCIPAL_AMOUNT",
    label: "Pay Principal Amount",
  },
  INCREASE_MONTHLY_EMI: {
    value: "INCREASE_MONTHLY_EMI",
    label: "Increase Monthly EMI",
  },
  PRINCIPAL_AND_EMI: {
    value: "PRINCIPAL_AND_EMI",
    label: "Principal & EMI",
  },
};
export const PRE_PAYMENT_INTEREST_DIFF_TYPES: ObjectStringType = {
  LESSER: "Lesser",
  GREATER: "Greater",
  NO_PROFIT: "No Profit",
};
export const PRE_PAYMENT_COMPLETION_PERIOD_DIFF_TYPES: ObjectStringType = {
  EARLIER: "Earlier",
  LATER: "Later",
  SAME_PERIOD: "Same Time Period",
};
