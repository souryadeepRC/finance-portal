
// styles
import styles from "./LoanAmountLabel.module.scss";
// types
type LoanAmountLabelProps = {
    label: string;
    value: number;
  };
const LoanAmountLabel = ({
  label,
  value,
}: LoanAmountLabelProps): JSX.Element => {
  return (
    <span>
      <label className={styles["breakup-label"]}>{label} </label>
      <span>&#8377;</span>
      {value.toLocaleString("en-IN")}
    </span>
  );
};
LoanAmountLabel.displayName = "LoanAmountLabel";
export { LoanAmountLabel };
