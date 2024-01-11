import { memo, useState } from "react";
// library
import { Tab, Tabs } from "@mui/material";
// components
import { LoanBreakup } from "src/pages/home-loan/loan-breakup/LoanBreakup";
import { LoanAmortization } from "src/pages/home-loan/loan-amortization/LoanAmortization";
// styles
import styles from "./LoanPaymentBreakup.module.scss";
// constants
const LOAN_AMOUNT_BREAKUP_TYPES = {
  AMOUNT_BREAKUP: { label: "Breakup", value: 0 },
  AMORTIZATION: { label: "Amortization", value: 1 },
};

const LoanPaymentBreakupMobile = memo((): JSX.Element => {
  // state
  const [amountBreakupType, setAmountBreakupType] = useState<number>(
    LOAN_AMOUNT_BREAKUP_TYPES.AMOUNT_BREAKUP.value
  );
  // fns
  const onChange = (event: React.SyntheticEvent, amountBreakupType: number) => {
    setAmountBreakupType(amountBreakupType);
  };
  function tabProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  // render fns
  const renderBreakupDetails = (amountBreakupType: number): JSX.Element => {
    switch (amountBreakupType) {
      case LOAN_AMOUNT_BREAKUP_TYPES.AMOUNT_BREAKUP.value:
        return <LoanBreakup />;
      case LOAN_AMOUNT_BREAKUP_TYPES.AMORTIZATION.value:
        return <LoanAmortization />;
      default:
        return <></>;
    }
  };
  return (
    <>
      <Tabs
        className={styles["payment-breakup_tabs"]}
        value={amountBreakupType}
        onChange={onChange}
        aria-label="basic tabs example"
      >
        <Tab
          disableFocusRipple={true}
          className={styles["amount-breakup-view_tab"]}
          label={LOAN_AMOUNT_BREAKUP_TYPES.AMOUNT_BREAKUP.label}
          {...tabProps(LOAN_AMOUNT_BREAKUP_TYPES.AMOUNT_BREAKUP.value)}
        />
        <Tab
          className={styles["amount-breakup-view_tab"]}
          label={LOAN_AMOUNT_BREAKUP_TYPES.AMORTIZATION.label}
          {...tabProps(LOAN_AMOUNT_BREAKUP_TYPES.AMORTIZATION.value)}
        />
      </Tabs>
      {renderBreakupDetails(amountBreakupType)}
    </>
  );
});
LoanPaymentBreakupMobile.displayName = "LoanPaymentBreakupMobile";
export { LoanPaymentBreakupMobile };
