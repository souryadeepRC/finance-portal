import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import { Checkbox, FormControlLabel } from "@mui/material";
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
import { selectLoanAmount } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { AppDispatch } from "src/store/store";
import { PrePaidAmountType } from "src/store/home-loan-reducer/home-loan-types";
import {
  LoanInput,
  LoanInputOnChangeType,
} from "src/components/common/loan-input/LoanInput";
// constants
import {
  PRE_PAYMENT_TYPES,
  PRE_PAY_AMOUNT_INITIAL_STATE,
} from "src/constants/home-loan-constants";
// styles
import styles from "./AddPrePaymentOption.module.scss";
type PayByEmiProps = {
  onSave: () => void;
};

const PayByPrincipal = memo(({ onSave }: PayByEmiProps): JSX.Element => {
  // store
  const dispatch: AppDispatch = useDispatch();
  const loanAmount: number = useSelector(selectLoanAmount);
  // state
  const [prePaidPrincipal, setPrePaidPrincipal] = useState<PrePaidAmountType>({
    ...PRE_PAY_AMOUNT_INITIAL_STATE,
    incrementFactor: 0,
  });
  const [isIncrementChecked, setIsIncrementChecked] = useState<boolean>(false);
  // hooks
  useUpdatePrePayment(setPrePaidPrincipal);

  // fns
  const onIncrementCheck = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIsIncrementChecked(event.target.checked);
    setPrePaidPrincipal((prePaidPrincipal) => {
      return {
        ...prePaidPrincipal,
        incrementFactor: 5,
      };
    });
  };

  const onPrePaidPrincipalChange = ({ value }: LoanInputOnChangeType): void => {
    setPrePaidPrincipal((prePaidPrincipal) => {
      return {
        ...prePaidPrincipal,
        incrementFactor: value,
      };
    });
  };

  const onSaveBtnClick = (): void => {
    dispatch(
      updatePrePaymentOptions({
        type: PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT.value,
        params: { prePaidPrincipal },
      })
    );
    onSave();
  };

  // render fns
  return (
    <>
      <PrePayChoiceText
        prePaidChoice={prePaidPrincipal}
        isIncrementChecked={isIncrementChecked}
      />
      <PrePayAmount
        prePaidAmount={prePaidPrincipal}
        setPrePaidAmount={setPrePaidPrincipal}
        id="amount"
        label="Pre-paid Principal every year"
        minAmount={1000}
        maxAmount={loanAmount}
      />
      <FormControlLabel
        className={styles["pay-by-principal-increase__checkbox"]}
        control={
          <Checkbox
            checked={isIncrementChecked}
            onChange={onIncrementCheck}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Increase Pre Paid Principal Amount"
      />
      {isIncrementChecked && (
        <div className={styles["increment-factor__container"]}>
          <LoanInput
            id="incrementFactor"
            label="Increase every year By"
            value={prePaidPrincipal?.incrementFactor || 1}
            minValue={1}
            maxValue={100}
            step={5}
            adornmentIcon={<span>%</span>}
            onChange={onPrePaidPrincipalChange}
          />
        </div>
      )}
      <Button
        variant="contained"
        onClick={onSaveBtnClick}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </>
  );
});
PayByPrincipal.displayName = "PayByPrincipal";
export { PayByPrincipal };
