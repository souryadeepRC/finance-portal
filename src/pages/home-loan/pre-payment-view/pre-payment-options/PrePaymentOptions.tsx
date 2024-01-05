import { Box } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux"; 
// components 
// selectors
import { selectPrePaymentOptions } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { prePaymentOptionsType } from "src/store/home-loan-reducer/home-loan-types";
import { PrePaymentOption } from "./pre-payment-option/PrePaymentOption";
const PrePaymentOptions = memo((): JSX.Element => {
  // store
  const prePaymentOptions: prePaymentOptionsType[] = useSelector(
    selectPrePaymentOptions
  );

  return (
    <Box sx={{ display: "flex", overflowX: "auto", maxWidth: "70vw" }}>
      {prePaymentOptions?.map(
        (prePaymentOption: prePaymentOptionsType, index: number) => {
          return (
            <PrePaymentOption key={index} prePaymentOption={prePaymentOption} />
          );
        }
      )}
    </Box>
  );
});
PrePaymentOptions.displayName = "PrePaymentOptions";
export { PrePaymentOptions };
