import { memo, useState } from "react";
import { useSelector } from "react-redux";
// library
import GridViewIcon from "@mui/icons-material/GridView";
// common components
import { Button } from "src/components/common/button/Button";
import { Modal } from "src/components/common/modal/Modal";
// components
import { MonthlyAmortization } from "./MonthlyAmortization";
// selectors
import {
  selectLoanPaymentYear,
  selectPaymentYearMonthlyBreakup,
} from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { HomeLoanMonthlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types";

const MonthlyBreakup = memo((): JSX.Element => {
  // store
  const loanPaymentYear: number = useSelector(selectLoanPaymentYear);
  const monthlyBreakup: HomeLoanMonthlyAmortizationType[] = useSelector(
    selectPaymentYearMonthlyBreakup
  );
  //state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // fns
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <MonthlyAmortization
          monthlyBreakup={monthlyBreakup}
          tenureYear={loanPaymentYear}
        />
      </Modal>
      <Button
        variant="contained"
        startIcon={<GridViewIcon />}
        onClick={handleOpen}
      >
        Monthly Breakup
      </Button>
    </>
  );
});
MonthlyBreakup.displayName = "MonthlyBreakup";
export { MonthlyBreakup };
