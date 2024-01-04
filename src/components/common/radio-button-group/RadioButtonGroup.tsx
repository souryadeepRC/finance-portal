import { memo } from "react";
// library
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
// types
type RadioButtonGroupData = {
  value: string;
  label: string;
};
type RadioButtonGroupProps = {
  label: string;
  value: string;
  dataset: RadioButtonGroupData[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const RadioButtonGroup = memo(
  ({ label, value, dataset, onChange }: RadioButtonGroupProps): JSX.Element => {
    return (
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={onChange}
          row
        >
          {dataset?.map(
            ({ label, value }: RadioButtonGroupData, index: number) => (
              <FormControlLabel
                key={index}
                value={value}
                control={<Radio />}
                label={label}
              />
            )
          )}
        </RadioGroup>
      </FormControl>
    );
  }
);
RadioButtonGroup.displayName = "RadioButtonGroup";
export { RadioButtonGroup };
