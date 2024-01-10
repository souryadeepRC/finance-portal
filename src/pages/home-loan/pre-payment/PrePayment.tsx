import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// icons
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
// common components
import { Button } from "src/components/common/button/Button";
import { Modal } from "src/components/common/modal/Modal";
// components
import { PrePaymentErrorPage } from "./PrePaymentErrorPage";
import { AddPrePaymentOption } from "./add-pre-payment-option/AddPrePaymentOption";
import { LoanDetails } from "src/pages/home-loan/loan-details/LoanDetails";
import { PrePaymentOptions } from "./pre-payment-options/PrePaymentOptions";
// selectors
import { selectMonthlyEmi } from "src/store/home-loan-reducer/home-loan-selectors";
// styles
import styles from "./PrePayment.module.scss";

const PrePayment = memo((): JSX.Element => {
  // store
  const monthlyEmi: number = useSelector(selectMonthlyEmi);
  // hooks
  const navigate = useNavigate();
  // fns
  const onBackBtnClick = () => {
    navigate("/homeLoan");
  };
  //state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // fns
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  // render fns
  if (monthlyEmi === 0) {
    return <PrePaymentErrorPage />;
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <AddPrePaymentOption onSave={handleClose} />
      </Modal>
      <Button
        sx={{ margin: "16px 16px 0 16px" }}
        variant="contained"
        onClick={onBackBtnClick}
        startIcon={<RestartAltIcon />}
      >
        Modify Loan Details
      </Button>
      <div className={styles["pre-payment__container"]}>
        <LoanDetails />
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<PlaylistAddIcon />}
          sx={{ alignSelf: "flex-start" }}
        >
          Add Pre payment Option
        </Button>
        <PrePaymentOptions />
      </div>
    </>
  );
});
PrePayment.displayName = "PrePayment";
export { PrePayment };
