import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import { Divider } from "@mui/material";
// icons
import SaveIcon from "@mui/icons-material/Save";
// common components
import { Button } from "src/components/common/button/Button";
// components
import { PrePayAmount } from "./PrePayAmount";
import { PrePayChoiceText } from "./PrePayChoiceText";
// hooks
import { useUpdatePrePayment } from "src/hooks/home-loan/useUpdatePrePayment";
// actions
import { updatePrePaymentOptions } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import { selectMonthlyEmi } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { AppDispatch } from "src/store/store";
import { PrePaidAmountType } from "src/store/home-loan-reducer/home-loan-types";
// constants
import {
  PRE_PAY_AMOUNT_INITIAL_STATE,
  PRE_PAYMENT_TYPES,
} from "src/constants/home-loan-constants";

type PayByPrincipalEmiProps = {
  onSave: () => void;
};

const PayByPrincipalEmi = memo(
  ({ onSave }: PayByPrincipalEmiProps): JSX.Element => {
    // store
    const dispatch: AppDispatch = useDispatch();
    const monthlyEmi: number = Math.round(useSelector(selectMonthlyEmi));

    // state
    const [prePaidPrincipal, setPrePaidPrincipal] = useState<PrePaidAmountType>(
      PRE_PAY_AMOUNT_INITIAL_STATE
    );
    const [prePaidEmi, setPrePaidEmi] = useState<PrePaidAmountType>(
      PRE_PAY_AMOUNT_INITIAL_STATE
    );

    // hooks
    useUpdatePrePayment(setPrePaidPrincipal);
    useUpdatePrePayment(setPrePaidEmi, true);
    // fns

    const onSaveBtnClick = (): void => {
      dispatch(
        updatePrePaymentOptions({
          type: PRE_PAYMENT_TYPES.PRINCIPAL_AND_EMI.value,
          params: {
            prePaidPrincipal,
            prePaidEmi,
          },
        })
      );
      onSave();
    };

    // render fns
    return (
      <>
        <PrePayChoiceText prePaidChoice={prePaidPrincipal} />
        <PrePayChoiceText prePaidChoice={prePaidEmi} isPayByEmi={true} />
        <PrePayAmount
          prePaidAmount={prePaidPrincipal}
          setPrePaidAmount={setPrePaidPrincipal}
          id="principal"
          label="Pre-paid Principal every year"
          minAmount={1000}
        />
        <Divider sx={{ width: "100%" }} />
        <PrePayAmount
          prePaidAmount={prePaidEmi}
          setPrePaidAmount={setPrePaidEmi}
          id="emi"
          label="Upgrade EMI"
          minAmount={monthlyEmi}
        />
        <Button
          variant="contained"
          onClick={onSaveBtnClick}
          startIcon={<SaveIcon />}
          disabled={prePaidEmi?.amount <= monthlyEmi}
        >
          Save
        </Button>
      </>
    );
  }
);
PayByPrincipalEmi.displayName = "PayByPrincipalEmi";
export { PayByPrincipalEmi };
