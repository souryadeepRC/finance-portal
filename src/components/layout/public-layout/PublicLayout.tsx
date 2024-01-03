import { memo } from "react";
// components
import { AppNavigationBar } from "src/components/app-navigation-bar/AppNavigationBar";

type PublicLayoutProps = {
  children: JSX.Element;
};
const PublicLayout = memo(({ children }: PublicLayoutProps) => {
  // render fns
  return (
    <>
      <AppNavigationBar />
      {children}
    </>
  );
});
PublicLayout.displayName = "PublicLayout";
export { PublicLayout };
