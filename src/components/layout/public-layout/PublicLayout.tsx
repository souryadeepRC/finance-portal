import { memo } from "react";
// components
import { Header } from "src/components/common/header/Header";

type PublicLayoutProps = {
  children: JSX.Element;
};
const PublicLayout = memo(({ children }: PublicLayoutProps) => {
  // render fns
  return (
    <>
      <Header />
      {children}
    </>
  );
});
PublicLayout.displayName = "PublicLayout";
export { PublicLayout };
