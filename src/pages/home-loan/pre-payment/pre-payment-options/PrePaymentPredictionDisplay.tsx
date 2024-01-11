import { memo } from "react";
// library
import { Box, Divider } from "@mui/material";
// common components
import { DisplayLabel } from "src/components/common/display-label/DisplayLabel";
// utils
import { getGrammaticalText } from "src/utils/string-utils";
// constants
import {
  PRE_PAYMENT_TYPES,
  PRE_PAYMENT_COMPLETION_PERIOD_DIFF_TYPES,
  PRE_PAYMENT_INTEREST_DIFF_TYPES,
} from "src/constants/home-loan-constants";
import { MONTH_ARRAY } from "src/constants/common-constants";
// types
import {
  PrePaidAmountType,
  PrePaymentCompletionPeriodDiff,
  PrePaymentInfoParamType,
  PrePaymentInfoType,
  PrePaymentInterestDiff,
  PrePaymentPrediction,
} from "src/store/home-loan-reducer/home-loan-types";
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

const getPrePayChoicePrincipal = (
  prePaidPrincipal: PrePaidAmountType | undefined
): string => {
  if (!prePaidPrincipal) return "";
  const { incrementFactor, amount, month, year } = prePaidPrincipal;

  let predictionText: string = `Pre Paid ₹${amount} Principal every year on ${MONTH_ARRAY[month]} from ${year}.`;
  if (incrementFactor && incrementFactor >= 0) {
    predictionText = `Also increased by ${incrementFactor}% every year`;
  }
  return predictionText;
};

const getPrePayChoiceEmi = (
  prePaidEmi: PrePaidAmountType | undefined
): string => {
  if (!prePaidEmi) return "";
  const { amount, month, year } = prePaidEmi;
  return `Increased Emi to ₹${amount} from ${MONTH_ARRAY[month]}-${year}.`;
};

const getPrePaymentChoice = ({
  type,
  params,
}: PrePaymentInfoType): JSX.Element => {
  const { prePaidPrincipal, prePaidEmi }: PrePaymentInfoParamType = params;

  switch (type) {
    case PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT.value:
      return <>{getPrePayChoicePrincipal(prePaidPrincipal)}</>;
    case PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI.value:
      return <>{getPrePayChoiceEmi(prePaidEmi)}</>;
    case PRE_PAYMENT_TYPES.PRINCIPAL_AND_EMI.value: {
      return (
        <>
          {getPrePayChoicePrincipal(prePaidPrincipal)}
          <br />
          {getPrePayChoiceEmi(prePaidEmi)}
        </>
      );
    }
    default:
      return <></>;
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
        <div className={styles["payment-option-type__text"]}>
          {getPrePaymentChoice(info)}
        </div>

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
