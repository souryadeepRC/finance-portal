import { memo } from "react";

type PrivateLayoutProps = {
  children: JSX.Element;
};
const PrivateLayout = memo(({ children }: PrivateLayoutProps) => {
  // render fns
  return <>{children}</>;
});
PrivateLayout.displayName = "PrivateLayout";
export { PrivateLayout };
