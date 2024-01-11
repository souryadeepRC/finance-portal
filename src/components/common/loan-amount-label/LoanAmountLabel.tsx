// styles
import "./LoanAmountLabel.scss";
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
    <div className="loan-amount-label__container">
      <label className="label__heading">{label} </label>
      <label className="label__info">
        <span className="label__icon">&#8377;</span>
        <span className="label__value">{Math.round(value).toLocaleString("en-IN")}</span>
      </label>
    </div>
  );
};
LoanAmountLabel.displayName = "LoanAmountLabel";
export { LoanAmountLabel };
