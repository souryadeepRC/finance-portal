import { memo, useState } from "react";
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

const PrePaymentView = memo((): JSX.Element => {
  //state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // fns
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  // fns 
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <AddPrePaymentOption />
      </Modal>
      <Box sx={{ padding: 2, display: "flex" }}>
        <LoanDetails />

        <Box>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<PlaylistAddIcon />}
          >
            Add Pre payment Option
          </Button>
        </Box>
      </Box>
    </>
  );
});
PrePaymentView.displayName = "PrePaymentView";
export { PrePaymentView };
