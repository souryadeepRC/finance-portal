import { memo } from "react";
// styles
import styles from "./DisplayLabel.module.scss";
// types
type DisplayLabelProps = {
  label: string;
  value: string;
};
const DisplayLabel = memo(
  ({ label, value }: DisplayLabelProps): JSX.Element => {
    return (
      <span>
        <label className={styles["display-label"]}>{label} </label>
        <span>{value}</span>
      </span>
    );
  }
);
DisplayLabel.displayName = "DisplayLabel";
export { DisplayLabel };
