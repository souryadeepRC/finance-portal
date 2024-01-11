// library
import { Modal as MuiModal, Box } from "@mui/material";
//styles
const ModalContainerStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width:'70%',
  borderRadius: '10px',
  overflowY:'auto',
  maxHeight:'65vh'
};
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};
const Modal = ({ isOpen, onClose, children }: ModalProps): JSX.Element => {
  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={ModalContainerStyle}>{children}</Box>
    </MuiModal>
  );
};
export { Modal };
