import { memo } from "react";
import { useDispatch } from "react-redux";
// library
import { Box } from "@mui/material";
// icons
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
// common components
import { Button } from "src/components/common/button/Button";
import { Popover } from "src/components/common/popover/Popover"; 
// components
import { PaidAmountBreakup } from "src/pages/home-loan/loan-details/PaidAmountBreakup";
import { PrePaymentPredictionDisplay } from "./PrePaymentPredictionDisplay";
// actions
import { removePrePaymentOption } from "src/store/home-loan-reducer/home-loan-actions";
// types
import { prePaymentOptionsType } from "src/store/home-loan-reducer/home-loan-types";
import { AppDispatch } from "src/store/store";
// styles
import styles from "./PrePaymentOptions.module.scss";
// types
type PrePaymentOptionProps = {
  prePaymentOption: prePaymentOptionsType;
};

const PrePaymentOption = memo(
  ({ prePaymentOption }: PrePaymentOptionProps): JSX.Element => {
    // store
    const dispatch: AppDispatch = useDispatch();
    const { info, id, predictions, paidAmountBreakup } = prePaymentOption;

    // fns
    const onRemove = (prePaymentOptionId: number) => (): void => {
      dispatch(removePrePaymentOption(prePaymentOptionId));
    };

    return (
      <Box className={styles["payment-option__container"]}>
        <PrePaymentPredictionDisplay predictions={predictions} info={info} />

        <Popover label="View payment breakup">
          <PaidAmountBreakup breakupDetails={paidAmountBreakup} />
        </Popover>
        <Button
          sx={{ margin: 2 }}
          variant="contained"
          onClick={onRemove(id)}
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
