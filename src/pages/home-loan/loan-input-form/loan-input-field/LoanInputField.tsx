import { memo } from "react";
// library
import { Input } from "@mui/material";
// styles
import styles from "./LoanInputField.module.scss";
// type
type LoanInputFieldProps = {
  className?: string;
  id: string;
  label: string;
  icon: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const LoanInputField = memo(
  ({
    className = "",
    id,
    label,
    icon,
    value,
    onChange,
  }: LoanInputFieldProps): JSX.Element => {
    // render fns
    return (
      <div className={styles["loan-input-field__container"]}>
        <label className={styles["input-label"]}>{label}</label>
        <div className={`${className} ${styles["input-value__container"]}`}>
          <Input
            disableUnderline={true}
            id={id}
            value={value}
            onChange={onChange}
          />
          <span>{icon}</span>
        </div>
      </div>
    );
  }
);
LoanInputField.displayName = "LoanInputField";
export { LoanInputField };
