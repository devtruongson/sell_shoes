import queryString from 'query-string';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import './index.scss';
import { adminRoutes, buyerRoutes, publicRoutes } from "./routes";

function Layout({ user, role }) {
    const location = useLocation();
    if (!user)
        return (
            <Navigate to="/request-login" state={{ from: location }} replace />
        );
    else {
        if (user?.role === role) {
            return <Outlet />;
        } else {
            return (
                <Navigate
                    to="/unauthozied"
                    state={{ from: location }}
                    replace
                />
            );
        }
    }
}
function App() {
    const parsed = queryString.parse(window.location.search);

    useEffect(() => {
        if(parsed.very_success) {
            // eslint-disable-next-line no-restricted-globals
            const check = confirm("Bạn xác thực thành công tài khoản!");
            if(check) {
                window.location.href = "/"
            }
        }
    },[])

    let currentUser = useSelector((state) => state.auth.login.currentUser);
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        element={<Layout user={currentUser} role={"Buyer"} />}
                    >
                        {buyerRoutes.map((route, index) => {
                            const Layout = route.layout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                    <Route
                        element={<Layout user={currentUser} role={"Admin"} />}
                    >
                        {adminRoutes.map((route, index) => {
                            const Layout = route.layout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
