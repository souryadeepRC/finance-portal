import { memo, useState } from "react";
// library
import { Popover as MuiPopover } from "@mui/material";
// icons
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
// styles
import "./Popover.scss";

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
    <>
      <span
        className="popover__heading"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {label}&nbsp;
        <DoubleArrowIcon />
      </span>
      <MuiPopover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {children}
      </MuiPopover>
    </>
  );
});
Popover.displayName = "Popover";
export { Popover };
