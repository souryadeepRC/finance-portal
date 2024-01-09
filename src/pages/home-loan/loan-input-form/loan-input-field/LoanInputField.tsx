import { memo } from "react";
// library
import { Input } from "@mui/material";
import Slider from "@mui/material/Slider";
// styles
import "./LoanInputField.scss";
import { HomeLoanInputType } from "src/store/home-loan-reducer/home-loan-types";
// type
type LoanInputFieldProps = {
  className?: string;
  id: string;
  label: string;
  icon: string;
  value: number;
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

    const isInvalidField: boolean = value === disabledValue;

    // render fns
    return (
      <div className={"loan-input-field__container"}>
        <div className={"input-field__box"}>
          <label className={"input-label"}>{label}</label>
          {isInvalidField && (
            <span className={"input-label-error-msg"}>
              Provide positive non-zero number
            </span>
          )}
          <div className={`${className} ${"input-value__container"}`}>
            <Input
              className={isInvalidField ? `${"error"}` : ""}
              disableUnderline={true}
              id={id}
              value={value}
              onChange={onInputChange}
            />
            <span className={isInvalidField ? `${"error"}` : ""}>
              {icon}
            </span>
          </div>
        </div>
        <Slider
          className={isInvalidField ? `${"error"}` : ""}
          defaultValue={defaultValue}
          step={step}
          aria-label={label}
          valueLabelDisplay="auto"
          value={value}
          min={minValue}
          max={maxValue}
          /* disabled={value === disabledValue} */
          onChange={onSliderChange}
        />
      </div>
    );
  }
);
LoanInputField.displayName = "LoanInputField";
export { LoanInputField };
