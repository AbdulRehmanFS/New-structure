/* eslint-disable react/prop-types */
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { publicPath } from "./public";
import { privatePath } from "./private";
import PageNotFound from "@features/pageNotFound/pages/PageNotFound";
import LayoutPage from "@layouts/LayoutPage";

function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function PrivateRoute({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}

function App() {
  const { token } = useSelector((e) => e?.signIn?.data) || {};

  return (
    <Routes>
      <Route element={<PublicRoute isAuthenticated={token} />}>
        {publicPath?.map((ele,i) => (
          <Route key={i} path={ele?.path} element={ele?.element} />
        ))}
      </Route>

      <Route element={<PrivateRoute isAuthenticated={token} />}>
        <Route path="" element={<LayoutPage />}>
          {privatePath?.map((ele) =>
            ele?.childern ? (
              <Route path={ele?.path} element={ele?.element} key={ele?.path}>
                {ele?.childern?.map((val) => (
                  <Route
                    index={val?.index}
                    path={val?.path}
                    element={val?.element}
                    key={val?.path}
                  />
                ))}
              </Route>
            ) : (
              <Route path={ele?.path} element={ele?.element} key={ele?.path} />
            )
          )}
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
