import { memo } from "react";
// library
import { InputAdornment, Slider, TextField } from "@mui/material";
// utils
import { isNumeric, isValidData } from "src/utils/string-utils";
// styles
import "./LoanInput.scss";

export type LoanInputOnChangeType = {
  id: string;
  value: number;
  textValue?: string;
};
type LoanInputProps = {
  className?: string;
  id: string;
  label: string;
  textValue?: string;
  value: number;
  step?: number;
  minValue?: number;
  maxValue?: number;
  disabledValue?: number;
  adornmentPosition?: string;
  adornmentIcon?: JSX.Element;
  validityFunc?: any;
  onChange: ({ id, value }: LoanInputOnChangeType) => void;
};

const LoanInput = memo(
  ({
    id,
    label,
    textValue,
    value,
    disabledValue = 0,
    adornmentPosition = "end",
    adornmentIcon,
    validityFunc,
    onChange,
    step = 1,
    minValue,
    maxValue,
  }: LoanInputProps): JSX.Element => {
    const getInputProps = () => {
      if (!adornmentIcon) return {};

      if (adornmentPosition === "start") {
        return {
          startAdornment: (
            <InputAdornment position="start">{adornmentIcon}</InputAdornment>
          ),
        };
      }
      return {
        endAdornment: (
          <InputAdornment position="end">{adornmentIcon}</InputAdornment>
        ),
      };
    };

    const onTextFieldChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      const enteredValue: string = e.target.value;
      
      // validation
      if (!isValidData(enteredValue)) return;
      if (validityFunc && !validityFunc(enteredValue)) return;
      if (maxValue && +enteredValue > maxValue) return;
      if (minValue && +enteredValue < minValue) return;

      const modifiedTextValue: string = isNumeric(enteredValue)
        ? `${+enteredValue}`
        : enteredValue;
      onChange({
        id,
        value: +enteredValue,
        ...(textValue && { textValue: modifiedTextValue }),
      });
    };
    const onSliderChange = (e: Event, value: number | number[]): void => {
      const sliderTextValue = `${value}`;
      const modifiedTextValue: string = isNumeric(sliderTextValue)
        ? `${+sliderTextValue}`
        : sliderTextValue;
        
      onChange({
        id,
        value: +value,
        ...(textValue && { textValue: modifiedTextValue }),
      });
    };
    const isInvalidField: boolean = value === disabledValue;
    // render fns
    return (
      <div className="loan-input__container">
        <TextField
          className={isInvalidField ? "input-error" : ""}
          id={id}
          inputProps={{ "data-testid": id }}
          value={textValue || value}
          onChange={onTextFieldChange}
          label={label}
          variant="outlined"
          InputProps={getInputProps()}
        />
        {isInvalidField && (
          <span data-testid={`${id}-error-msg`} className={"input-error-msg"}>
            Provide positive non-zero number
          </span>
        )}
        <Slider
          className={isInvalidField ? "input-error" : ""}
          step={step}
          aria-label={label}
          valueLabelDisplay="auto"
          value={value}
          min={minValue}
          max={maxValue}
          onChange={onSliderChange}
        />
      </div>
    );
  }
);
LoanInput.displayName = "LoanInput";
export { LoanInput };
