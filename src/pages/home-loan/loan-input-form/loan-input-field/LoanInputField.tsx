import { memo } from "react";
// library
import { Input } from "@mui/material";
import Slider from "@mui/material/Slider";
// styles
import styles from "./LoanInputField.module.scss";
import { HomeLoanInputType } from "src/store/home-loan-reducer/home-loan-types";
// type
type LoanInputFieldProps = {
  className?: string;
  id: string;
  label: string;
  icon: string;
  value: string;
  step?: number;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  disabledValue: number;
  onChange: ({ enteredId, enteredValue }: HomeLoanInputType) => void;
};
const LoanInputField = memo(
  ({
    className = "",
    id,
    label,
    icon,
    value,
    defaultValue,
    step = 1,
    minValue,
    maxValue,
    disabledValue,
    onChange,
  }: LoanInputFieldProps): JSX.Element => {
    // fns
    const onSliderChange = (e: Event, newValue: number | number[]): void => {
      onChange({
        enteredId: id,
        enteredValue: `${newValue}`,
      });
    };
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const enteredId: string = e.target.id;
      const enteredValue: string = e.target.value;
      onChange({
        enteredId,
        enteredValue,
      });
    };
    // render fns
    return (
      <div className={styles["loan-input-field__container"]}>
        <div className={styles['input-field__box']}>
          <label className={styles["input-label"]}>{label}</label>
          <div className={`${className} ${styles["input-value__container"]}`}>
            <Input
              disableUnderline={true}
              id={id}
              value={value}
              onChange={onInputChange}
            />
            <span>{icon}</span>
          </div>
        </div>
        <Slider
          defaultValue={defaultValue}
          step={step}
          aria-label={label}
          valueLabelDisplay="auto"
          value={parseFloat(value)}
          min={minValue}
          max={maxValue}
          disabled={parseFloat(value) === disabledValue}
          onChange={onSliderChange}
        />
      </div>
    );
  }
);
LoanInputField.displayName = "LoanInputField";
export { LoanInputField };
