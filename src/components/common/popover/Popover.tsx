import { memo, useState } from "react";
// library
import { Popover as MuiPopover,Typography } from "@mui/material";
// constants
import { APP_PRIMARY_COLOR } from "src/constants/common-constants";
// types
type PopoverProps = {
  label: string;
  children: JSX.Element;
};
const Popover = memo(({ label, children }: PopoverProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{color: APP_PRIMARY_COLOR,fontWeight:'bold',cursor:'pointer'}}
      >
        {label}
      </Typography>
      <MuiPopover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {children}
      </MuiPopover>
    </div>
  );
});
Popover.displayName = "Popover";
export { Popover };
