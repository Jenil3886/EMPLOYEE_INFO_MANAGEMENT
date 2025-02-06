import { FiHome } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";

export const SIDEBAR_TOP_TABS = [{ path: "/", label: "Home", icon: <FiHome /> }];

export const SIDEBAR_BOTTOM_TABS = [{ path: "/settings", label: "Settings", icon: <TbSettings /> }];

export const AUTH_FIELDS = [
	{ id: "email", label: "Email", type: "email", placeholder: "name@example.com", autoComplete: "email" },
	{ id: "password", label: "Password", type: "password", placeholder: "Password", autoComplete: "current-password" },
];

export const LOG_IN_FIELDS = [AUTH_FIELDS];

export const SIGN_IN_FIELDS = [
	{ id: "username", label: "User Name ", type: "text", placeholder: "Enter your name" },
	{ id: "email", label: "Email", type: "email", placeholder: "name@example.com", autoComplete: "email" },
	{ id: "password", label: "Password", type: "password", placeholder: "Password", autoComplete: "current-password" },
	{
		name: "role",
		type: "select",
		options: [
			{ value: "", label: "Select Role" },
			{ value: "Hr", label: "Hr" },
			{ value: "Admin", label: "Admin" },
			{ value: "User", label: "User" },
		],
	},
];
