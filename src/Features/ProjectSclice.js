import { createSlice } from "@reduxjs/toolkit";

export const ProjectSlice = createSlice({
	name: "project",
	initialState: {
		project: localStorage.getItem("projectList") ? JSON.parse(localStorage.getItem("projectList")) : [],
		task: localStorage.getItem("taskList") ? JSON.parse(localStorage.getItem("taskList")) : [],
	},
	reducers: {
		addProject: (state, action) => {
			console.log(action.payload + " //** THIS IS ACTION **//");
			state.project = [...action.payload];
			localStorage.setItem("projectList", JSON.stringify(state.project));
		},
		addProjectTask: (state, action) => {
			state.task = [...action.payload];
			localStorage.setItem("taskList", JSON.stringify(state.task));
		},
	},
});

// Action creators are generated for each case reducer function
export const { addProject, addProjectTask } = ProjectSlice.actions;

export default ProjectSlice.reducer;
