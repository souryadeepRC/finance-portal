import { memo } from "react";
import { useSelector } from "react-redux";
// library
import { List, ListItem, Alert } from "@mui/material";
// common components
import { LoanAmountLabel } from "src/components/common/loan-amount-label/LoanAmountLabel";
//selectors
import {
  selectLoanAmount,
  selectPaymentYearAmortization,
} from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { HomeLoanYearlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types";
// utils
import { getGrammaticalText } from "src/utils/string-utils";
// styles
import styles from "./YearlyAmortization.module.scss";
type AmortizationAmountType = {
  label: string;
  value: number;
};
const YearlyAmortization = memo((): JSX.Element => {
  const loanAmount: number = useSelector(selectLoanAmount);
  const {
    principalPaid,
    interestPaid,
    outstandingBalance,
    remainingYearCount,
  }: HomeLoanYearlyAmortizationType = useSelector(
    selectPaymentYearAmortization
  );
  const amortizationAmounts: AmortizationAmountType[] = [
    {
      label: "Principal Paid",
      value: principalPaid,
    },
    {
      label: "Interest Paid",
      value: interestPaid,
    },
    {
      label: "Outstanding Balance",
      value: outstandingBalance,
    },
    {
      label: "Loan Recovered",
      value: loanAmount - outstandingBalance,
    },
  ];
  // render fns
  const renderCompletionStatus = (): JSX.Element => {
    return remainingYearCount === 0 ? (
      <Alert severity="success">Congratulations! Loan paid completely</Alert>
    ) : (
      <Alert severity="info">
        {getGrammaticalText(remainingYearCount, "Year")} Left
      </Alert>
    );
  };
  return (
    <>
      <List className={styles["amortization-amount__container"]}>
        {amortizationAmounts?.map(
          ({ label, value }: AmortizationAmountType, index: number) => (
            <ListItem key={index} sx={{ display: "list-item" }}>
              <LoanAmountLabel label={label} value={value} />
            </ListItem>
          )
        )}
      </List>
      {renderCompletionStatus()}
    </>
  );
});
YearlyAmortization.displayName = "YearlyAmortization";
export { YearlyAmortization };
