import { Box } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";
// components
import { PrePaymentOption } from "./PrePaymentOption";
// selectors
import { selectPrePaymentOptions } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { prePaymentOptionsType } from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./PrePaymentOptions.module.scss";

const PrePaymentOptions = memo((): JSX.Element => {
  // store
  const prePaymentOptions: prePaymentOptionsType[] = useSelector(
    selectPrePaymentOptions
  );

  return (
    <Box className={styles["payment-options__container"]}>
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
