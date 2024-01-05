import { memo, useState } from "react";
import {  useSelector } from "react-redux";
// library
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import dayjs from "dayjs";
// common components
import { Button } from "src/components/common/button/Button";
// components
import { LoanInputField } from "src/pages/home-loan/loan-input-form/loan-input-field/LoanInputField";
// actions 
// selectors
import { selectLoanAmount } from "src/store/home-loan-reducer/home-loan-selectors";
// types 
import { HomeLoanInputType } from "src/store/home-loan-reducer/home-loan-types";
// utils
import { isValidData } from "src/utils/string-utils";
// styles
import styles from "./PayByPrincipal.module.scss";
import { DatePicker } from "src/components/common/date-picker/DatePicker";
type PayByEmiProps = {
  onSave: () => void;
};
type PrePaidPrincipalType = {
  amount: number;
  incrementFactor: number;
  month: number;
};
const INITIAL_STATE: PrePaidPrincipalType = {
  amount: 1000,
  incrementFactor: 10,
  month: 0,
};
const PayByPrincipal = memo(({ onSave }: PayByEmiProps): JSX.Element => {
  // store 
  const loanAmount:number = useSelector(selectLoanAmount);
  // state
  const [prePaidPrincipal, setPrePaidPrincipal] =
    useState<PrePaidPrincipalType>(INITIAL_STATE);
  // fns
  const onPrePaidPrincipalMonthChange = (
    selectedDate: dayjs.Dayjs | null
  ): void => {
    setPrePaidPrincipal((prePaidPrincipal) => {
      return {
        ...prePaidPrincipal,
        month: selectedDate?.month() || new Date().getMonth(),
      };
    });
  };
  const onPrePaidPrincipalChange = ({
    enteredId,
    enteredValue,
  }: HomeLoanInputType): void => {
    if (!isValidData(enteredValue)) return;

    setPrePaidPrincipal((prePaidPrincipal) => {
      return {
        ...prePaidPrincipal,
        [enteredId]: +enteredValue,
      };
    });
  };
  const onSaveBtnClick = (): void => {
    onSave();
  };
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const { amount, incrementFactor, month } = prePaidPrincipal;
  // render fns
  return (
    <Box className={styles["pay-by-principal__container"]}>
      <Box>
        <LoanInputField
          className={styles["updated-principal__input"]}
          id="amount"
          label="Pre Paid Principal"
          icon="&#8377;"
          value={amount}
          defaultValue={INITIAL_STATE.amount}
          minValue={INITIAL_STATE.amount}
          maxValue={loanAmount}
          disabledValue={0}
          onChange={onPrePaidPrincipalChange}
        />
        <Box>
          <Box>
            <FormControlLabel
              className={styles["pay-by-principal-increase__checkbox"]}
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Increase Pre Paid Principal Amount"
            />
          </Box>

          {checked && (
            <Box sx={{ display: "flex", gap: 3 }}>
              <LoanInputField
                id="incrementFactor"
                label="Increase every year By"
                icon="%"
                value={incrementFactor}
                defaultValue={INITIAL_STATE.incrementFactor}
                minValue={INITIAL_STATE.incrementFactor}
                maxValue={100}
                step={5}
                disabledValue={0}
                onChange={onPrePaidPrincipalChange}
              />
              <DatePicker
                label="After this month"
                views={["month"]}
                value={dayjs(new Date(2023, month))}
                onChange={onPrePaidPrincipalMonthChange}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Button variant="contained" onClick={onSaveBtnClick}>
        Save
      </Button>
    </Box>
  );
});
PayByPrincipal.displayName = "PayByPrincipal";
export { PayByPrincipal };
