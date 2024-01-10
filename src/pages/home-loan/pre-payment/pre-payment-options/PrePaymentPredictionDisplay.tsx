import { memo } from "react";
// library
import { Box, Divider } from "@mui/material";
// common components
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
// utils
import { getGrammaticalText } from "src/utils/string-utils";
// constants
import {
  PRE_PAYMENT_COMPLETION_PERIOD_DIFF_TYPES,
  PRE_PAYMENT_INTEREST_DIFF_TYPES,
  PRE_PAYMENT_TYPES,
} from "src/store/home-loan-reducer/home-loan-constants";
// types
import {
  PrePaidPrincipalType,
  PrePaymentCompletionPeriodDiff,
  PrePaymentInfoParamType,
  PrePaymentInfoType,
  PrePaymentInterestDiff,
  PrePaymentPrediction,
} from "src/store/home-loan-reducer/home-loan-types";
// constants
import { MONTH_ARRAY } from "src/constants/common-constants";
// styles
import styles from "./PrePaymentOptions.module.scss";

type PrePaymentPredictionDisplayProps = {
  predictions: PrePaymentPrediction;
  info: PrePaymentInfoType;
};
const getCompletionPeriodPredictionText = ({
  month,
  year,
  type,
}: PrePaymentCompletionPeriodDiff): string => {
  if (month === 0 && year === 0)
    return PRE_PAYMENT_COMPLETION_PERIOD_DIFF_TYPES.SAME_PERIOD;

  const monthDiff: string = getGrammaticalText(month, "Month");
  const yearDiff: string = getGrammaticalText(year, "Year");
  return `${yearDiff} ${monthDiff} ${type}`;
};
const getInterestPredictionText = ({
  amount,
  percentage,
}: PrePaymentInterestDiff): string => {
  if (amount === 0) return PRE_PAYMENT_INTEREST_DIFF_TYPES.NO_PROFIT;

  const percentageDiff: string = percentage > 0 ? `(${percentage}%)` : "";
  const amountDiff: string = `${amount.toLocaleString("en-IN")}`;
  return `Save Rs. ${amountDiff} ${percentageDiff}`;
};
const getPrePaymentType = ({ type, params }: PrePaymentInfoType): string => {
  const { prePaidPrincipal, updatedEmi }: PrePaymentInfoParamType = params;

  switch (type) {
    case PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT: {
      const { amount = 0, month = 0 } =
        prePaidPrincipal as PrePaidPrincipalType;
      return `Pre Paid ₹${amount} Principal every year after ${MONTH_ARRAY[month]}`;
    }
    case PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI:
      return `Increased Emi to ₹${updatedEmi}`;
    case PRE_PAYMENT_TYPES.PRINCIPAL_AND_EMI: {
      const { amount = 0, month = 0 } =
        prePaidPrincipal as PrePaidPrincipalType;
      return `Increased Emi to ₹${updatedEmi}\n and Pre Paid ₹${amount} Principal every year after ${MONTH_ARRAY[month]}`;
    }
    default:
      return "";
  }
};
const PrePaymentPredictionDisplay = memo(
  ({ predictions, info }: PrePaymentPredictionDisplayProps): JSX.Element => {
    const { interestAmountDiff, completionPeriodDiff }: PrePaymentPrediction =
      predictions;
    // render fns
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: "0 10px",
        }}
      >
        <DisplayLabel
          className={styles["payment-option-type__text"]}
          value={getPrePaymentType(info)}
        />
        <DisplayLabel
          className={styles["payment-option-prediction__text"]}
          label="loan Completion"
          value={getCompletionPeriodPredictionText(completionPeriodDiff)}
        />
        <DisplayLabel
          className={styles["payment-option-prediction__text"]}
          label="Profit on Interest"
          value={getInterestPredictionText(interestAmountDiff)}
        />
        <Divider sx={{ margin: "10px 0 0 0" }} />
      </Box>
    );
  }
);
PrePaymentPredictionDisplay.displayName = "PrePaymentPredictionDisplay";
export { PrePaymentPredictionDisplay };
