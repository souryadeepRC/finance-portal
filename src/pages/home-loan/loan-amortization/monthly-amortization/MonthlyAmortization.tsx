import { memo } from "react";
// library
import { Typography, Box } from "@mui/material";
// common components
import { Loader } from "src/components/common/loader/Loader";
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
// types
import { HomeLoanMonthlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types";
// constants
import { MONTH_ARRAY } from "src/constants/common-constants";
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
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          className={styles["amortization-breakup__heading"]}
        >
          Loan payment breakup of {tenureYear}
        </Typography>
        <div className={styles["amortization-breakup__container"]}>
          {monthlyBreakup?.map(
            ({
              principalPaid,
              interestPaid,
              month,
            }: HomeLoanMonthlyAmortizationType) => {
              return (
                <div
                  key={month}
                  className={styles["amortization-breakup__element"]}
                >
                  <span className={styles["amortization-breakup__month"]}>
                    {MONTH_ARRAY[month]}
                  </span>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <LoanAmountLabel label="Principal" value={principalPaid} />
                    <LoanAmountLabel label="Interest" value={interestPaid} />
                  </Box>
                </div>
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
