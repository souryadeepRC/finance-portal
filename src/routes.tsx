import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "src/components/common/loader/Loader";
// Lazy loaded pages
const HomeLoan = lazy(() =>
  import("./pages/home-loan/HomeLoan").then(({ HomeLoan }) => ({
    default: HomeLoan,
  }))
);
const PrePayment = lazy(() =>
  import("./pages/home-loan/pre-payment/PrePayment").then(
    ({ PrePayment }) => ({
      default: PrePayment,
    })
  )
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
        <Route path="" element={<Navigate to="homeLoan" />} />
        <Route path="homeLoan">
          <Route index element={<HomeLoan />} />
          <Route path="prePayment" element={<PrePayment />}></Route>
        </Route>
        <Route path="about" element={<AboutPortal />} />
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </Suspense>
  );
};
export { AppRoutes };
