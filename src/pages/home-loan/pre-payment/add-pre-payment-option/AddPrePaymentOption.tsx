import { memo, useState } from "react";
// common components
import { RadioButtonGroup } from "src/components/common/radio-button-group/RadioButtonGroup";
// components
import { PayByEmi } from "./PayByEmi";
import { PayByPrincipal } from "./PayByPrincipal";
import { PayByPrincipalEmi } from "./PayByPrincipalEmi";
// constants 
import { PRE_PAYMENT_TYPES } from "src/constants/home-loan-constants";
// styles
import styles from "./AddPrePaymentOption.module.scss";

const PrePaymentOption = [
  PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT,
  PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI,
  PRE_PAYMENT_TYPES.PRINCIPAL_AND_EMI,
];
// types
type AddPrePaymentOptionProps = {
  onSave: () => void;
};
const AddPrePaymentOption = memo(
  ({ onSave }: AddPrePaymentOptionProps): JSX.Element => {
    // state
    const [paymentOption, setPaymentOption] = useState<string>(
      PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT.value
    );
    // fns
    const onPaymentOptionChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setPaymentOption((event.target as HTMLInputElement).value);
    };
    // render fns
    const renderPaymentOption = (paymentOption: string): JSX.Element => {
      switch (paymentOption) {
        case PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT.value:
          return <PayByPrincipal onSave={onSave} />;
        case PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI.value:
          return <PayByEmi onSave={onSave} />;
        case PRE_PAYMENT_TYPES.PRINCIPAL_AND_EMI.value:
          return <PayByPrincipalEmi onSave={onSave} />;
        default:
          return <></>;
      }
    };
    return (
      <div>
        <RadioButtonGroup
          label="Pre Payment Option"
          value={paymentOption}
          dataset={PrePaymentOption}
          onChange={onPaymentOptionChange}
        />
        <div className={styles["pre-payment-choice__container"]}>
          {renderPaymentOption(paymentOption)}
        </div>
      </div>
    );
  }
);
AddPrePaymentOption.displayName = "AddPrePaymentOption";
export { AddPrePaymentOption };
