import React from "react";
import { Location, useLocation } from "react-router-dom";
// components
import { SkeletonHomeLoan } from "./HomeLoanSkeleton";

const AppSkeleton = (): JSX.Element => {
  // hooks
  const { pathname }: Location = useLocation();
  // fns
  const renderPageSkeleton = (pathname: string): JSX.Element => {
    switch (pathname) {
      case "/home-loan":
        return <SkeletonHomeLoan />;
      default:
        return <></>;
    }
  };

  return renderPageSkeleton(pathname);
};
AppSkeleton.displayName = "AppSkeleton";
export { AppSkeleton };
