import { memo } from "react";
import { NavLink } from "react-router-dom";
// styles
import styles from "./NavigationLink.module.scss";
// types
type NavigationLinkProps = {
  label: string;
  path: string;
};
const NavigationLink = memo(
  ({ label, path }: NavigationLinkProps): JSX.Element => {
    return (
      <NavLink className={styles["navigation-link"]} to={path}>
        {label}
      </NavLink>
    );
  }
);
NavigationLink.displayName = "NavigationLink";
export { NavigationLink };
