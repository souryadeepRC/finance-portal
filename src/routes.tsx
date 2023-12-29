import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom"; 
import { Loader } from "src/components/common/loader/Loader";
// Lazy loaded pages
const HomeLoan = lazy(() =>
  import("./pages/home-loan/HomeLoan").then(({ HomeLoan }) => ({
    default: HomeLoan,
  }))
);
const AboutPortal = lazy(() =>
  import("./pages/about-portal/AboutPortal").then(({ AboutPortal }) => ({
    default: AboutPortal,
  }))
);

export const LayoutRoute = ({
  component: Component,
  layout: Layout,
  ...restProps
}: any): any => {
  return (
    <Layout {...restProps}>
      <Component />
    </Layout>
  );
};
const AppRoutes = (): JSX.Element => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/home-loan" replace />} />
        <Route path="/home-loan" element={<HomeLoan />} />
        <Route path="/about" element={<AboutPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
export { AppRoutes };
