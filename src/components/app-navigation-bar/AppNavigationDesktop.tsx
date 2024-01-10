import { memo } from "react";
// common components
import { NavigationLink } from "src/components/common/navigationL-link/NavigationLink";
import { FlexBox } from "src/components/common/flex-box/FlexBox";
// components
import { AppDisplay } from "src/components/app-display/AppDisplay";
// types
import { NavigationPath } from "./AppNavigationBar";
// constants
import { NAVIGATION_PATHS } from "./AppNavigationBar";

const AppNavigationDesktop = memo((): JSX.Element => {
  return (
    <FlexBox sx={{ width: "100%" }}>
      <AppDisplay sx={{ flex: 1 }} />
      <FlexBox sx={{ flex: 2, justifyContent: "flex-end", gap: '20px' }}>
        {NAVIGATION_PATHS.map(
          ({ label, path }: NavigationPath, index: number) => (
            <NavigationLink key={index} path={path} label={label} />
          )
        )}
      </FlexBox>
    </FlexBox>
  );
});
AppNavigationDesktop.displayName = "AppNavigationDesktop";
export { AppNavigationDesktop };
