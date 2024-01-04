import { memo } from "react";
// library
import { Box } from "@mui/material";
// styles
import styles from "./DisplayLabel.module.scss";
// types
type DisplayLabelProps = {
  label?: string;
  value: string;
};
const DisplayLabel = memo(
  ({ label, value }: DisplayLabelProps): JSX.Element => {
    return (
      <Box className={styles["display-label__container"]}>
        {label && <label className={styles["label__heading"]}>{label} </label>}
        <span className={styles["label__value"]}>{value}</span>
      </Box>
    );
  }
);
DisplayLabel.displayName = "DisplayLabel";
export { DisplayLabel };
