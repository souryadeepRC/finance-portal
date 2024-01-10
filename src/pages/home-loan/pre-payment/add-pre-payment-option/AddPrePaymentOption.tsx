import { memo, useState } from "react";
// common components
import { RadioButtonGroup } from "src/components/common/radio-button-group/RadioButtonGroup";
import { PayByEmi } from "./pay-by-emi/PayByEmi";
import { PayByPrincipal } from "./pay-by-principal/PayByPrincipal";
import { PayByPrincipalEmi } from "./pay-by-principal-emi/PayByPrincipalEmi";
// constants
import { PRE_PAYMENT_TYPES } from "src/store/home-loan-reducer/home-loan-constants";

 
const PrePaymentOption = [
  { value: PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT, label: "Pay Principal Amount" },
  { value: PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI, label: "Increase Monthly EMI" },
  { value: PRE_PAYMENT_TYPES.PRINCIPAL_AND_EMI, label: "Both" },
];
// types
type AddPrePaymentOptionProps = {
  onSave: () => void;
};
const AddPrePaymentOption = memo(
  ({ onSave }: AddPrePaymentOptionProps): JSX.Element => {
    // state
    const [paymentOption, setPaymentOption] = useState<string>(
      PrePaymentOption[0].value
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
        case PRE_PAYMENT_TYPES.PAY_PRINCIPAL_AMOUNT:
          return <PayByPrincipal onSave={onSave} />;
        case PRE_PAYMENT_TYPES.INCREASE_MONTHLY_EMI:
          return <PayByEmi onSave={onSave} />;
        case PRE_PAYMENT_TYPES.PRINCIPAL_AND_EMI:
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
        {renderPaymentOption(paymentOption)}
      </div>
    );
  }
);
AddPrePaymentOption.displayName = "AddPrePaymentOption";
export { AddPrePaymentOption };
