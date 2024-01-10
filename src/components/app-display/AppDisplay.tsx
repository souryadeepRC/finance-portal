import { memo } from "react";
// icons
import SavingsIcon from "@mui/icons-material/Savings";
// constants
import { APP_DISPLAY_NAME } from "src/constants/common-constants";
// styles
import "./AppDisplay.scss";
type AppDisplayProps = {
  sx?: {};
};
const AppDisplay = memo(({ sx = {} }: AppDisplayProps): JSX.Element => {
  return (
    <div className="app-display__container" style={sx}>
      <SavingsIcon />
      <span className="app-display__title">{APP_DISPLAY_NAME}</span>
    </div>
  );
});
AppDisplay.displayName = "AppDisplay";
export { AppDisplay };
