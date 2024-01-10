import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// common components
import { FlexBox } from "src/components/common/flex-box/FlexBox";

const PrePaymentErrorPage = memo((): JSX.Element => {
  // hooks
  const navigate = useNavigate();
  // state
  const [timer, setTimer] = useState<number>(5);

  // effects
  useEffect(() => {
    if (timer === 0) {
      navigate("/homeLoan");
    }
    const timerId: ReturnType<typeof setTimeout> = setTimeout(
      () => setTimer((timer) => timer - 1),
      1000
    );
    return () => clearTimeout(timerId);
  }, [timer, navigate]);

  // render fns
  return (
    <FlexBox
      sx={{
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        fontSize: "20px",
        color: " green",
        gap: "10px",
        textAlign: "center",
        fontWeight: "700",
        flexDirection: "column",
        margin: "0 auto",
        width: "60%",
      }}
    >
      <span>Please set loan amount , interest Rate and tenure</span>
      <span>Returning to Home Loan set up page... {timer}</span>
    </FlexBox>
  );
});
PrePaymentErrorPage.displayName = "PrePaymentErrorPage";
export { PrePaymentErrorPage };
