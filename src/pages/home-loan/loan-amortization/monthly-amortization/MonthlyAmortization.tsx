import { memo } from "react";
// common components
import { Loader } from "src/components/common/loader/Loader";
// components
import { MonthlyAmountBreakup } from "./MonthlyAmountBreakup";
// types
import { HomeLoanMonthlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./MonthlyAmortization.module.scss";

type MonthlyAmortizationProps = {
  monthlyBreakup: HomeLoanMonthlyAmortizationType[];
  tenureYear: number;
};

const MonthlyAmortization = memo(
  ({ monthlyBreakup, tenureYear }: MonthlyAmortizationProps): JSX.Element => {
    if (monthlyBreakup?.length <= 0) return <Loader isSkeleton={true} />;
    return (
      <div className={styles["monthly-amortization__container"]}>
        <span className={styles["amortization-breakup__heading"]}>
          Loan payment breakup of {tenureYear}
        </span>
        <div className={styles["amortization-breakup__container"]}>
          {monthlyBreakup?.map(
            (amountBreakup: HomeLoanMonthlyAmortizationType, index: number) => {
              return (
                <MonthlyAmountBreakup
                  key={index}
                  amountBreakup={amountBreakup}
                />
              );
            }
          )}
        </div>
      </div>
    );
  }
);
MonthlyAmortization.displayName = "MonthlyAmortization";
export { MonthlyAmortization };
