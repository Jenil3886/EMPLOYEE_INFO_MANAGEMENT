import { Navigate, useLocation } from "react-router-dom";
import { CONSTANTS } from "../lib/constants";

export const AuthMiddleware = ({ children }) => {
	const user = JSON.parse(localStorage.getItem(CONSTANTS.IS_LOGGED_IN)); // Store session data

	const { pathname } = useLocation();

	if (!user) {
		return <Navigate to="/login" />;
	}

	switch (user.role) {
		case CONSTANTS.HR:
			if (!pathname.startsWith("/hr")) return <Navigate to="/hr" />;
			break;

		case CONSTANTS.USER:
			if (!pathname.startsWith("/user")) return <Navigate to="/user" />;
			break;
	}

	return children;
};

export const HomeMiddleware = () => {
	const user = JSON.parse(localStorage.getItem(CONSTANTS.IS_LOGGED_IN)); // Store session data

	if (!user) {
		return <Navigate to="/login" />;
	}

	switch (user.role) {
		case CONSTANTS.HR:
			return <Navigate to="/hr" />;

		case CONSTANTS.ADMIN:
			return <Navigate to="/admin" />;

		default:
			return <Navigate to="/user" />;
	}
};
