import { memo } from "react";
import { useDispatch } from "react-redux";
// library
import { Box } from "@mui/material";
// icons
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
// common components
import { Button } from "src/components/common/button/Button";
// components
import { LoanAmountInfo } from "src/pages/home-loan/pre-payment-view/loan-amount-info/LoanAmountInfo";
// types
import { prePaymentOptionsType } from "src/store/home-loan-reducer/home-loan-types";
import { AppDispatch } from "src/store/store";
import { removePrePaymentOption } from "src/store/home-loan-reducer/home-loan-actions";
// types
type PrePaymentOptionProps = {
  prePaymentOption: prePaymentOptionsType;
};
const PrePaymentOption = memo(
  ({ prePaymentOption }: PrePaymentOptionProps): JSX.Element => {
    // store
    const dispatch: AppDispatch = useDispatch();
    const { prePaymentOptionId, modifiedLoanDetails } =
      prePaymentOption;

    // fns
    const onRemove = (prePaymentOptionId: number) => (): void => {
      dispatch(removePrePaymentOption(prePaymentOptionId));
    };

    return (
      <Box>
        <LoanAmountInfo loanAmountInfo={modifiedLoanDetails} />
        <Button
          variant="contained"
          onClick={onRemove(prePaymentOptionId)}
          startIcon={<DeleteSweepIcon />}
        >
          Remove
        </Button>
      </Box>
    );
  }
);
PrePaymentOption.displayName = "PrePaymentOption";
export { PrePaymentOption };
