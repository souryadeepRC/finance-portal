import { memo } from "react";
// library
import { AppBar } from "@mui/material";
// components
import { AppNavigationMobile } from "./AppNavigationMobile";
import { AppNavigationDesktop } from "./AppNavigationDesktop";
// hooks
import { useMedia } from "src/hooks/useMedia";
// constants
import { APP_PRIMARY_COLOR } from "src/constants/common-constants";
// types
export type NavigationPath = {
  label: string;
  path: string;
};
export const NAVIGATION_PATHS: NavigationPath[] = [
  { label: "Home Loan", path: "/homeLoan" },
  { label: "About", path: "/about" },
];

const AppNavigationBar = memo((): JSX.Element => {
  // hooks
  const isMobile: boolean = useMedia();
  return (
    <AppBar
      sx={{
        position: "static",
        padding: 2,
        backgroundColor: APP_PRIMARY_COLOR,
      }}
    >
      {isMobile ? <AppNavigationMobile /> : <AppNavigationDesktop />}
    </AppBar>
  );
});
AppNavigationBar.displayName = "AppNavigationBar";
export { AppNavigationBar };
