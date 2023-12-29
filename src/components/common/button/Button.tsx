// library
import { ButtonProps, Button as MuiButton } from "@mui/material";
// styles
import styles from "./Button.module.scss";

const Button = (props: ButtonProps): JSX.Element => {
  return <MuiButton className={styles["app-button"]} {...props} />;
};
Button.displayName = "Button";
export { Button };
