import { useState } from "react";

const useMedia = (): boolean => {
  // state
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const mediaQuery: string = "(max-width: 767px)";
  const mediaQueryList: MediaQueryList = window.matchMedia(mediaQuery);

  mediaQueryList.addEventListener(
    "change",
    (event: MediaQueryListEvent): void => {
      setIsMobile(event.matches);
    }
  );
  return isMobile;
};
export { useMedia };
