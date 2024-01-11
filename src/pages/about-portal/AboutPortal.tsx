// styles
import styles from "./AboutPortal.module.scss";

const AboutPortal = (): JSX.Element => {
  return (
    <div className={styles["about-portal__container"]}>
      <span>
        This application provides economic data and information all in one
        place. It acts as an information hub for users or clients, often
        individual investors, and provides up-to-date financial information and
        data to make investment decisions.
      </span>
      <span>
        User can get home loan break up, completion period, amortization by
        entering loan amount loan tenure loan interest rate loan start period.
        Also user can use the pre payment prediction feature as well.
      </span>
    </div>
  );
};
export { AboutPortal };
