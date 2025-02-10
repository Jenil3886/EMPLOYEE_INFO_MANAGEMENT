import { createSlice } from "@reduxjs/toolkit";

export const LeaveSclice = createSlice({
	name: "leave",
	initialState: {
		value: localStorage.getItem("leaveList") ? JSON.parse(localStorage.getItem("leaveList")) : [],
	},
	reducers: {
		addLeave: (state, action) => {
			state.value = [...state.value, action.payload];
			localStorage.setItem("leaveList", JSON.stringify(state.value));
		},
		updateLeaveStatus: (state, action) => {
			const { id, status } = action.payload;
			const leaveIndex = state.value.findIndex((leave) => leave.id === id);
			if (leaveIndex !== -1) {
				state.value[leaveIndex].status = status;
				localStorage.setItem("leaveList", JSON.stringify(state.value));
			}
		},
		deleteLeave: (state, action) => {
			state.value = state.value.filter((leave) => leave.id !== action.payload);
			localStorage.setItem("leaveList", JSON.stringify(state.value));
		},
	},
});

export const { addLeave, updateLeaveStatus, deleteLeave } = LeaveSclice.actions;

export default LeaveSclice.reducer;
