import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import { Box } from "@mui/material";
// common components
import { Button } from "src/components/common/button/Button";
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
// components
import { LoanInputField } from "src/pages/home-loan/loan-input-form/loan-input-field/LoanInputField";
// actions
import { updatePrePaymentOptions } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectMonthlyEmi } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { AppDispatch } from "src/store/store";
import { HomeLoanInputType } from "src/store/home-loan-reducer/home-loan-types";
// utils
import { isValidData } from "src/utils/string-utils";
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
  const monthlyEmi: number = useSelector(selectMonthlyEmi);
  // state
  const [updatedEmi, setUpdatedEmi] = useState<number>(Math.round(monthlyEmi));
  // fns
  const onEmiChange = ({ enteredValue }: HomeLoanInputType): void => {
    if (!isValidData(enteredValue)) return;
    setUpdatedEmi(+enteredValue);
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
    <Box className={styles["pay-by-emi__container"]}>
      <LoanAmountLabel label="Previous Monthly EMI" value={monthlyEmi} />
      <Box sx={{ width: "50%" }}>
        <LoanInputField
          id="monthlyEmi"
          label="Updated Monthly EMI"
          icon="&#8377;"
          value={updatedEmi}
          minValue={monthlyEmi}
          maxValue={10000000}
          disabledValue={0}
          onChange={onEmiChange}
        />
      </Box>
      <Button variant="contained" onClick={onSaveBtnClick}>
        Save
      </Button>
    </Box>
  );
});
PayByEmi.displayName = "PayByEmi";
export { PayByEmi };
