import { memo, useState } from "react";
// library
import {
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material/";
// icons
import SavingsIcon from "@mui/icons-material/Savings";
import MenuIcon from "@mui/icons-material/Menu";
// common components
import { NavigationLink } from "src/components/common/navigationL-link/NavigationLink";
// constants
import {
  APP_DISPLAY_NAME,
  APP_PRIMARY_COLOR,
} from "src/constants/common-constants";
import { NAVIGATION_PATHS, NavigationPath } from "./AppNavigationBar";
const AppNavigationMobile = memo((): JSX.Element => {
  const [menuItemState, setMenuItemState] = useState<boolean>(false);
  // fns
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMenuItemState(open);
    };
  return (
    <>
      <SavingsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          fontFamily: "Tahoma",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
          display: { xs: "none", md: "flex" },
        }}
      >
        {APP_DISPLAY_NAME}
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={toggleDrawer(true)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={menuItemState}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{
              width: 250,
              height: "100%",
              backgroundColor: APP_PRIMARY_COLOR,
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {NAVIGATION_PATHS.map(
                ({ label, path }: NavigationPath, index: number) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText>
                        <NavigationLink path={path} label={label} />
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
});
AppNavigationMobile.displayName = "AppNavigationMobile";
export { AppNavigationMobile };
