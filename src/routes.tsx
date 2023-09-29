
import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// components
import { PrivateLayout } from 'src/components/layout/private-layout/PrivateLayout';
import { PublicLayout } from 'src/components/layout/public-layout/PublicLayout';
// Lazy loaded pages
const HomeLoan = lazy(() =>
    import('./pages/home-loan/HomeLoan')
        .then(({ HomeLoan }) => ({ default: HomeLoan }))
);
const AboutPortal = lazy(() =>
    import('./pages/about-portal/AboutPortal')
        .then(({ AboutPortal }) => ({ default: AboutPortal }))
);

export const LayoutRoute = ({
    component: Component,
    layout: Layout,
    ...restProps
}: any): any => {
    return (
        <Layout  {...restProps} >
            <Component />
        </Layout>
    )
}
const AppRoutes = (): JSX.Element => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/home" replace />} />
                <Route
                    path="/home"
                    element={<LayoutRoute component={HomeLoan}
                        layout={PrivateLayout} />
                    }
                />
                <Route
                    path="/about"
                    element={<LayoutRoute component={AboutPortal}
                        layout={PublicLayout} />
                    }
                />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    )
}
export  {AppRoutes}