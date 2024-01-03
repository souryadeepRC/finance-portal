import { memo } from "react";
// library
import { AppBar, Container, Toolbar, } from "@mui/material";
// components
import { AppNavigationMobile } from "./AppNavigationMobile";
import { AppNavigationDesktop } from "./AppNavigationDesktop";
// constants
import { APP_PRIMARY_COLOR } from "src/constants/common-constants";
// styles
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
  return (
    <AppBar position="static" sx={{ backgroundColor: APP_PRIMARY_COLOR }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppNavigationMobile />
          <AppNavigationDesktop />
        </Toolbar>
      </Container>
    </AppBar>
  );
});
AppNavigationBar.displayName = "AppNavigationBar";
export { AppNavigationBar };
