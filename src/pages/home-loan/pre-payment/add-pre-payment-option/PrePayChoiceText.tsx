import { memo } from "react";
// types
import { PrePaidAmountType } from "src/store/home-loan-reducer/home-loan-types";
// constants
import { MONTH_ARRAY } from "src/constants/common-constants";
// styles
import styles from "./AddPrePaymentOption.module.scss";

type PrePayChoiceTextProps = {
  prePaidChoice: PrePaidAmountType;
  isPayByEmi?: boolean;
  isIncrementChecked?: boolean;
};
const PrePayChoiceText = memo(
  ({
    prePaidChoice,
    isPayByEmi,
    isIncrementChecked,
  }: PrePayChoiceTextProps): JSX.Element => {
    const { amount, incrementFactor, month, year }: PrePaidAmountType =
      prePaidChoice;

    if (isPayByEmi) {
      return (
        <span className={styles["pre-payment-choice__text"]}>
          You choose to change your emi to &#8377;
          {amount.toLocaleString("en-IN")} from {MONTH_ARRAY[month]}-{year}{" "}
          onwards
        </span>
      );
    }
    return (
      <span className={styles["pre-payment-choice__text"]}>
        You choose to pre pay &#8377;{amount.toLocaleString("en-IN")} on every{" "}
        {MONTH_ARRAY[month]} from {year} onwards
        {isIncrementChecked &&
          `. Also increasing Principal by ${incrementFactor}% every year`}
      </span>
    );
  }
);
PrePayChoiceText.displayName = "PrePayChoiceText";
export { PrePayChoiceText };
