import { memo, useState } from "react";
// common components
import { RadioButtonGroup } from "src/components/common/radio-button-group/RadioButtonGroup";
import { PayByEmi } from "./pay-by-emi/PayByEmi";

const PrePaymentOption = [
  { value: "payPrincipal", label: "Pay Principal Amount" },
  { value: "increaseEmi", label: "Increase Monthly EMI" },
];
const AddPrePaymentOption = memo((): JSX.Element => {
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
      case "payPrincipal":
        return <></>;
      case "increaseEmi":
        return <PayByEmi />;
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
});
AddPrePaymentOption.displayName = "AddPrePaymentOption";
export { AddPrePaymentOption };
