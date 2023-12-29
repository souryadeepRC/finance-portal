import styles from "./AboutPortal.module.scss";
const AboutPortal = (): JSX.Element => {
  return (
    <div className={styles["about-portal__container"]}>
      <span className={styles["about-content"]} >
        This web-app provides a variety of financial data and information all in
        one place. They act as information hubs for users or clients, who are
        often individual investors and provide up-to-date financial information
        and data to make their investment decisions.
      </span>
    </div>
  );
};
export { AboutPortal };
