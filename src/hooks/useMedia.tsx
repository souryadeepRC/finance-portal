// library
import { useMediaQuery } from "@mui/material";

const useMedia = (): boolean => {
  const mediaQuery: string = "(max-width: 769px)";
  const isMobile: boolean = useMediaQuery(mediaQuery);
  return isMobile;
};
export { useMedia };
