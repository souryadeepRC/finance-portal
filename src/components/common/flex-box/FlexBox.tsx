import { memo } from "react";
type FlexBoxProps = {
  sx?: {};
  className?: string;
  children: JSX.Element | JSX.Element[];
};
const FlexBox = memo(
  ({ sx = {}, className = "", children }: FlexBoxProps): JSX.Element => {
    return (
      <div role="presentation" className={className} style={{ display: "flex", ...sx }}>
        {children}
      </div>
    );
  }
);
FlexBox.displayName = "FlexBox";
export { FlexBox };
