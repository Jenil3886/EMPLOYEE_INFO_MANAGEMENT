import { Route, Routes, useLocation } from "react-router-dom";

import { LoginPage } from "./Pages/Auth/LogInPage";
import { SigninPage } from "./Pages/Auth/SignInPage";

import { AdminRoutes, HrRoutes, UserRoutes } from "./router/index";
import { Sidebar } from "./components/SideBar/SideBar";
import { MainHeader } from "./components/Header/MainHeader";
import { useState } from "react";
import { useMemo } from "react";
import { AuthMiddleware, HomeMiddleware } from "./router/middleware";
import { CONSTANTS } from "./lib/constants";
import { useEffect } from "react";
import { setUser } from "./Features/AuthSlice";
import { dispatchEvent } from "./app/Store";

function App() {
  const user = JSON.parse(localStorage.getItem(CONSTANTS.IS_LOGGED_IN)); // Store session data
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const location = useLocation();

  const showHeader = useMemo(
    () => !new RegExp(/^\/items\/[a-zA-Z0-9_-]+$/).test(location.pathname),
    [location.pathname]
  );

  useEffect(() => {
    dispatchEvent(setUser(user));
  }, [user]);

  return (
    <>
      <div
        style={{
          height: "100dvh",
          width: "100vw",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {showHeader && <MainHeader />}

          <main className="flex-grow overflow-y-auto [&::-webkit-scrollbar]:w-0.5">
            <Routes>
              <Route
                path="*"
                element={
                  <div className="text-gray-400 font-bold text-7xl w-full text-center mt-44 ">
                    The page you’re looking <br /> for can’t be found.
                  </div>
                }
              />
              <Route path="/" element={<HomeMiddleware />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/login" element={<LoginPage />} />

              {HrRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<AuthMiddleware>{route.component}</AuthMiddleware>}
                />
              ))}
              {AdminRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<AuthMiddleware>{route.component}</AuthMiddleware>}
                />
              ))}
              {UserRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<AuthMiddleware>{route.component}</AuthMiddleware>}
                />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
