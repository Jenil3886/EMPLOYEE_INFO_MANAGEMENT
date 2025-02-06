import { configureStore } from "@reduxjs/toolkit";
import { AddEmployeSlice } from "../Features/AddEmploye";
import { ProjectSlice } from "../Features/ProjectSclice";

export const store = configureStore({
	reducer: {
		employee: AddEmployeSlice.reducer,
		project: ProjectSlice.reducer,
	},
});
