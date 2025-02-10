import { createSlice } from "@reduxjs/toolkit";

export const ProjectSlice = createSlice({
	name: "project",
	initialState: {
		value: [],
	},
	reducers: {
		addProject: (state, action) => {
			console.log(action.payload + " //** PROJECT ADDED ON YOUR SITE **//");
			state.value = [...state.value, action.payload];
			localStorage.setItem("projectList", JSON.stringify(state.project));
		},
		updateProject: (state, action) => {
			state.value = state.value.map((project) => (project.id === action.payload.id ? { ...project, ...action.payload } : project));
			localStorage.setItem("projectList", JSON.stringify(state.value));
		},
		deleteProject: (state, action) => {
			state.value = state.value.filter((project) => project.id !== action.payload);
			localStorage.setItem("projectList", JSON.stringify(state.value));
		},
		// addProjectTask: (state, action) => {
		// 	state.task = [...action.payload];
		// 	localStorage.setItem("taskList", JSON.stringify(state.task));
		// },
	},
});

// Action creators are generated for each case reducer function
export const { addProject, updateProject, deleteProject, addProjectTask } = ProjectSlice.actions;

export default ProjectSlice.reducer;
