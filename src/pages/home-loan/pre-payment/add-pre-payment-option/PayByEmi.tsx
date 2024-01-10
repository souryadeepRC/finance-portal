import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// icons
import SaveIcon from "@mui/icons-material/Save";
// common components
import { Button } from "src/components/common/button/Button";
// components
import { PrePayAmount } from "./PrePayAmount";
// hooks
import { useUpdatePrePayment } from "./useUpdatePrePayment";
// actions
import { updatePrePaymentOptions } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectMonthlyEmi } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { AppDispatch } from "src/store/store";
import { PrePaidAmountType } from "src/store/home-loan-reducer/home-loan-types";
// constants
import { PRE_PAYMENT_TYPES } from "src/store/home-loan-reducer/home-loan-constants";
import { MONTH_ARRAY } from "src/constants/common-constants";
// styles
import styles from "./AddPrePaymentOption.module.scss";
type PayByEmiProps = {
  onSave: () => void;
};

const PayByEmi = memo(({ onSave }: PayByEmiProps): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const monthlyEmi: number = Math.round(useSelector(selectMonthlyEmi));
  // state
  const [prePaidEmi, setPrePaidEmi] = useState<PrePaidAmountType>({
    amount: monthlyEmi,
    month: 0,
    year: 0,
  });
  // hooks
  useUpdatePrePayment(setPrePaidEmi);
  // fns
  const onSaveBtnClick = (): void => {
    dispatch(
      updatePrePaymentOptions({
        type: PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI.value,
        params: { updatedEmi: prePaidEmi },
      })
    );
    onSave();
  };
  const { amount, month, year } = prePaidEmi;
  // render fns
  return (
    <>
      <span className={styles["pre-payment-choice__text"]}>
        You choose to change your emi to &#8377;
        {amount.toLocaleString("en-IN")} from {MONTH_ARRAY[month]} from {year}{" "}
        onwards
      </span>
      <PrePayAmount
        prePaidAmount={prePaidEmi}
        setPrePaidAmount={setPrePaidEmi}
        id="emi"
        label="Upgrade EMI"
        minAmount={monthlyEmi}
        maxAmount={10000000}
      />
      <Button
        variant="contained"
        onClick={onSaveBtnClick}
        startIcon={<SaveIcon />}
        disabled={amount === monthlyEmi || amount === 0}
      >
        Save
      </Button>
    </>
  );
});
PayByEmi.displayName = "PayByEmi";
export { PayByEmi };
