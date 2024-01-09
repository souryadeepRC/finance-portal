import { memo } from "react";
// library
import { Button, Typography, Box } from "@mui/material/";
// icons
import SavingsIcon from "@mui/icons-material/Savings";
// common components
import { NavigationLink } from "src/components/common/navigationL-link/NavigationLink";
// constants
import { APP_DISPLAY_NAME } from "src/constants/common-constants";
import { NAVIGATION_PATHS, NavigationPath } from "./AppNavigationBar";

const AppNavigationDesktop = memo((): JSX.Element => {
  return (
    <>
      <SavingsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          fontFamily: "Tahoma",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
        }}
      >
        <NavigationLink path="" label={APP_DISPLAY_NAME} />
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {NAVIGATION_PATHS.map(
          ({ label, path }: NavigationPath, index: number) => (
            <Button key={index}>
              <NavigationLink path={path} label={label} />
            </Button>
          )
        )}
      </Box>
    </>
  );
});
AppNavigationDesktop.displayName = "AppNavigationDesktop";
export { AppNavigationDesktop };
