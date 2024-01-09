import { memo } from "react";
// library
import { Box } from "@mui/material";
// styles
import styles from "./DisplayLabel.module.scss";
// types
type DisplayLabelProps = {
  label?: string;
  value: string;
  className?: string;
};
const DisplayLabel = memo(
  ({ label, value, className = "" }: DisplayLabelProps): JSX.Element => {
    return (
      <Box className={`${className} ${styles["display-label__container"]}`}>
        {label && <label className={styles["label__heading"]}>{label} </label>}
        <span>{value}</span>
      </Box>
    );
  }
);
DisplayLabel.displayName = "DisplayLabel";
export { DisplayLabel };
