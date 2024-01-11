import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// icons
import SaveIcon from "@mui/icons-material/Save";
// common components
import { Button } from "src/components/common/button/Button";
// components
import { PrePayAmount } from "./PrePayAmount";
import { PrePayChoiceText } from "./PrePayChoiceText";
// hooks
import { useUpdatePrePayment } from "src/hooks/home-loan/useUpdatePrePayment";
// actions
import { updatePrePaymentOptions } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectMonthlyEmi } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { AppDispatch } from "src/store/store";
import { PrePaidAmountType } from "src/store/home-loan-reducer/home-loan-types";
// constants
import {
  PRE_PAYMENT_TYPES,
  PRE_PAY_AMOUNT_INITIAL_STATE,
} from "src/constants/home-loan-constants";
type PayByEmiProps = {
  onSave: () => void;
};

const PayByEmi = memo(({ onSave }: PayByEmiProps): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const monthlyEmi: number = Math.round(useSelector(selectMonthlyEmi));
  // state
  const [prePaidEmi, setPrePaidEmi] = useState<PrePaidAmountType>(
    PRE_PAY_AMOUNT_INITIAL_STATE
  );
  // hooks
  useUpdatePrePayment(setPrePaidEmi, true);
  // fns
  const onSaveBtnClick = (): void => {
    dispatch(
      updatePrePaymentOptions({
        type: PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI.value,
        params: { prePaidEmi },
      })
    );
    onSave();
  };
  const { amount } = prePaidEmi;
  const isInvalidEmiChoice: boolean = amount <= monthlyEmi || amount === 0;
  // render fns
  return (
    <>
      <PrePayChoiceText
        isInvalidEmiChoice={isInvalidEmiChoice}
        prePaidChoice={prePaidEmi}
        isPayByEmi={true}
      />
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
        disabled={isInvalidEmiChoice}
      >
        Save
      </Button>
    </>
  );
});
PayByEmi.displayName = "PayByEmi";
export { PayByEmi };
