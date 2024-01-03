import { memo } from "react";
import { useNavigate } from "react-router-dom";
// library
import { Box } from "@mui/material";
// icons
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
// common components
import { Button } from "src/components/common/button/Button";
// components
import { LoanDetails } from "./loan-details/LoanDetails";

const PrePaymentView = memo((): JSX.Element => {
  // hooks
  const navigate = useNavigate();
  // fns
  const onBackBtnClick = () => {
    navigate("/homeLoan/prePayment");
  };
  return (
    <Box sx={{ padding: 2, display: "flex" }}>
      <LoanDetails />
      <Box>
        <Button
          variant="contained"
          onClick={onBackBtnClick}
          startIcon={<PlaylistAddIcon />}
        >
          Add Pre payment Option
        </Button>
      </Box>
    </Box>
  );
});
PrePaymentView.displayName = "PrePaymentView";
export { PrePaymentView };
