import { useState, useEffect } from "react";

export const useAuth = () => {
	// Example: Get user token from localStorage
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("authToken"); // Example check
		setIsAuthenticated(!!token);
	}, []);

	return isAuthenticated;
};

// import { useState, useEffect } from "react";

// export const useAuth = () => {
// 	const [isAuthenticated, setIsAuthenticated] = useState(false);

// 	useEffect(() => {
// 		const token = localStorage.getItem("authToken"); // Check if authToken exists
// 		setIsAuthenticated(!!token); // Convert to boolean
// 	}, []);

// 	return isAuthenticated;
// };
