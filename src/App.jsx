import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { LoginPage } from "./Pages/Auth/LogInPage";
import { SigninPage } from "./Pages/Auth/SignInPage";

import { AdminRoutes, HrRoutes, UserRoutes } from "./router/index";
import { Sidebar } from "./components/SideBar/SideBar";
import { MainHeader } from "./components/Header/MainHeader";
import { useState } from "react";
import { useMemo } from "react";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const location = useLocation();

	const showHeader = useMemo(() => !new RegExp(/^\/items\/[a-zA-Z0-9_-]+$/).test(location.pathname), [location.pathname]);

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

					<main
						style={{
							flexGrow: 1,
							overflow: "auto",
						}}
					>
						<Routes>
							<Route path="/" element={<Navigate to="/signin" />} />
							<Route path="/signin" element={<SigninPage />} />
							<Route path="/login" element={<LoginPage />} />

							{HrRoutes.map((route) => (
								<Route key={route.path} path={route.path} element={route.component} />
							))}
							{AdminRoutes.map((route) => (
								<Route key={route.path} path={route.path} element={route.component} />
							))}
							{UserRoutes.map((route) => (
								<Route key={route.path} path={route.path} element={route.component} />
							))}
						</Routes>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
