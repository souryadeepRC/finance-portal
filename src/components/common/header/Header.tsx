import { memo } from "react";
import { Link } from "react-router-dom"; 
// styles
import styles from "./Header.module.scss";
// types
type NavigationPath = {
  label: string;
  path: string;
};
const NAVIGATION_PATHS: NavigationPath[] = [
  { label: "Home Loan", path: "/home-loan" },
  { label: "About", path: "/about" },
];
const Header = memo(() => {
  return (
    <div className={styles["header__container"]}> 
      {NAVIGATION_PATHS?.map((page: NavigationPath, index: number) => {
        const { label, path }: NavigationPath = page;
        return (
          <Link key={index} className={styles["header-link"]} to={path}>
            {label}
          </Link>
        );
      })}
    </div>
  );
});
Header.displayName = "Header";
export { Header };
