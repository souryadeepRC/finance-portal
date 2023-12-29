import { memo } from "react";
// images
import AppLogo from "src/assets/images/logo192.png";
// components
import { AppSkeleton } from "src/components/common/skeleton/AppSkeleton";
// styles
import styles from "./Loader.module.scss";
// type
type LoaderProps = {
  loading?: boolean;
  isSkeleton?: boolean;
};
const Loader = memo(
  ({ loading = true, isSkeleton = true }: LoaderProps): JSX.Element => {
    // render fns
    if (!loading) return <></>;
    
    return (
      <>
        {isSkeleton && <AppSkeleton />}
        <div className={styles["loader-container"]}>
          <img className={styles["app-logo"]} src={AppLogo} alt="App Logo" />
          <div className={styles["spinner"]}></div>
        </div>
      </>
    );
  }
);
Loader.displayName = "Loader";
export { Loader };
