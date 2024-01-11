import { memo } from "react";
// common components
import { FlexBox } from "src/components/common/flex-box/FlexBox";
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
// types
import { HomeLoanMonthlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types";
// constants
import { MONTH_ARRAY } from "src/constants/common-constants";
// styles
import styles from "./MonthlyAmortization.module.scss";

type MonthlyAmountBreakupProps = {
    amountBreakup: HomeLoanMonthlyAmortizationType;
};

const MonthlyAmountBreakup = memo(
  ({ amountBreakup }: MonthlyAmountBreakupProps): JSX.Element => {
    const { principalPaid, interestPaid, month } = amountBreakup;

    return (
      <div key={month} className={styles["amortization-breakup__element"]}>
        <span className={styles["amortization-breakup__month"]}>
          {MONTH_ARRAY[month]}
        </span>
        <FlexBox
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <LoanAmountLabel label="Principal" value={principalPaid} />
          <LoanAmountLabel label="Interest" value={interestPaid} />
        </FlexBox>
      </div>
    );
  }
);
MonthlyAmountBreakup.displayName = "MonthlyAmountBreakup";
export { MonthlyAmountBreakup };
