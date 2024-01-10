import { memo, useState } from "react";
// library
import { Drawer } from "@mui/material/";
// icons
import MenuIcon from "@mui/icons-material/Menu";
// common components
import { NavigationLink } from "src/components/common/navigationL-link/NavigationLink";
import { FlexBox } from "src/components/common/flex-box/FlexBox";
// components
import { AppDisplay } from "src/components/app-display/AppDisplay";
// types
import { NavigationPath } from "./AppNavigationBar";
// constants
import { NAVIGATION_PATHS } from "./AppNavigationBar";
// styles
import styles from "./AppNavigationBar.module.scss";

const AppNavigationMobile = memo((): JSX.Element => {
  // state
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
      <FlexBox sx={{ width: "100%" }}>
        <MenuIcon onClick={toggleDrawer(true)} />
        <AppDisplay sx={{ flex: 2 }} />
      </FlexBox>
      <Drawer anchor="left" open={menuItemState} onClose={toggleDrawer(false)}>
        <div
          className={styles["navigation-mobile__container"]}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {NAVIGATION_PATHS.map(
            ({ label, path }: NavigationPath, index: number) => (
              <NavigationLink key={index} path={path} label={label} />
            )
          )}
        </div>
      </Drawer>
    </>
  );
});
AppNavigationMobile.displayName = "AppNavigationMobile";
export { AppNavigationMobile };
