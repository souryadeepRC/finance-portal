import { memo, useState } from "react";
import { useSelector } from "react-redux";
// library
import { Box } from "@mui/material";
// icons
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
// common components
import { Button } from "src/components/common/button/Button";
import { Modal } from "src/components/common/modal/Modal";
// components
import { AddPrePaymentOption } from "./add-pre-payment-option/AddPrePaymentOption";
import { LoanDetails } from "./loan-details/LoanDetails";
import { PrePaymentOptions } from "./pre-payment-options/PrePaymentOptions";
// selectors
import {   selectMonthlyEmi } from "src/store/home-loan-reducer/home-loan-selectors";

const PrePaymentView = memo((): JSX.Element => {
  // store
  const monthlyEmi:number = useSelector(selectMonthlyEmi);
  //state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // fns
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  // fns 
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <AddPrePaymentOption onSave={handleClose}/>
      </Modal>
      <Box sx={{ padding: 2, display: "flex",flexWrap:'wrap',justifyContent:'center' }}>
        <LoanDetails />
        <Box>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<PlaylistAddIcon />}
            disabled={monthlyEmi===0}
          >
            Add Pre payment Option
          </Button>
          <PrePaymentOptions />
        </Box>
      </Box>
    </>
  );
});
PrePaymentView.displayName = "PrePaymentView";
export { PrePaymentView };
