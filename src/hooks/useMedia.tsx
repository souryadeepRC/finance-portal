import { useState } from "react";

const useMedia = (): boolean => {  
  // state
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth<=769);

  const mediaQuery: string = "(max-width: 769px)";
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
