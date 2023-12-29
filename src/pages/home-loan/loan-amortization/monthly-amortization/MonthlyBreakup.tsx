import { memo, useState } from "react";
// library
import GridViewIcon from "@mui/icons-material/GridView";
// common components
import { Button } from "src/components/common/button/Button";
import { Modal } from "src/components/common/modal/Modal";
// components
import { MonthlyAmortization } from "./MonthlyAmortization";
// types
import { HomeLoanMonthlyAmortizationType } from "src/store/home-loan-reducer/home-loan-types";
type MonthlyBreakupProps = {
    monthlyBreakup: HomeLoanMonthlyAmortizationType[];
    tenureYear: number;
}
const MonthlyBreakup = memo(({monthlyBreakup,tenureYear}:MonthlyBreakupProps): JSX.Element => {
    
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
          tenureYear={tenureYear}
        />
      </Modal>
      <Button
        variant="contained"
        startIcon={<GridViewIcon />}
        onClick={() => {
          handleOpen();
        }}
      >
        Monthly Breakup
      </Button>
    </>
  );
});
MonthlyBreakup.displayName = "MonthlyBreakup";
export { MonthlyBreakup };
