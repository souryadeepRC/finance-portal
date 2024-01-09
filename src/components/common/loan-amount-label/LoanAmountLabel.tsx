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
    <div className={styles["loan-amount-label__container"]}>
      <label className={styles["label__heading"]}>{label} </label>
      <label className={styles["label__info"]}>
        <span className={styles["label__icon"]}>&#8377;</span>
        <span className={styles["label__value"]}>{Math.round(value).toLocaleString("en-IN")}</span>
      </label>
    </div>
  );
};
LoanAmountLabel.displayName = "LoanAmountLabel";
export { LoanAmountLabel };
