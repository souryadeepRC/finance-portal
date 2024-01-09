import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// icons
import SaveIcon from "@mui/icons-material/Save";
// common components
import { Button } from "src/components/common/button/Button";
import { LoanInput } from "src/components/common/loan-input/LoanInput";
// actions
import { updatePrePaymentOptions } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectMonthlyEmi } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { AppDispatch } from "src/store/store";
import { LoanInputOnChangeType } from "src/components/common/loan-input/LoanInput";
// constants
import { PRE_PAYMENT_TYPES } from "src/store/home-loan-reducer/home-loan-constants";
// styles
import styles from "./PayByEmi.module.scss";
type PayByEmiProps = {
  onSave: () => void;
};
const PayByEmi = memo(({ onSave }: PayByEmiProps): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const monthlyEmi: number = Math.round(useSelector(selectMonthlyEmi));
  // state
  const [updatedEmi, setUpdatedEmi] = useState<number>(monthlyEmi);
  // fns
  const onEmiChange = ({ value }: LoanInputOnChangeType): void => {
    setUpdatedEmi(value);
  };

  const onSaveBtnClick = (): void => {
    dispatch(
      updatePrePaymentOptions({
        prePaymentType: PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI,
        prePaymentInfo: { updatedEmi },
      })
    );
    onSave();
  };
  // render fns
  return (
    <div className={styles["pay-by-emi__container"]}>
      <LoanInput
        id="emi"
        label="Updated Monthly EMI"
        value={updatedEmi}
        minValue={monthlyEmi}
        maxValue={10000000}
        adornmentPosition="start"
        adornmentIcon={<span>&#8377;</span>}
        onChange={onEmiChange}
      />
      <Button
        variant="contained"
        onClick={onSaveBtnClick}
        startIcon={<SaveIcon />}
        disabled={updatedEmi === monthlyEmi}
      >
        Save
      </Button>
    </div>
  );
});
PayByEmi.displayName = "PayByEmi";
export { PayByEmi };
