import { useCallback } from "react";
import { Location, useLocation } from "react-router-dom";
// components
import { SkeletonHomeLoan } from "./HomeLoanSkeleton";

const AppSkeleton = (): JSX.Element => {
  // hooks
  const location: Location = useLocation(); 
  // fns
  const renderPageSkeleton = useCallback((pathname: string): JSX.Element => {
    switch (pathname) {
      case "/home-loan":
        return <SkeletonHomeLoan />;
      default:
        return <></>;
    }
  },[location]);

  return renderPageSkeleton(location?.pathname);
};
AppSkeleton.displayName = "AppSkeleton";
export { AppSkeleton };
