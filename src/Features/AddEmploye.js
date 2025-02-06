import { createSlice } from "@reduxjs/toolkit";

export const AddEmployeSlice = createSlice({
	name: "employee",
	initialState: {
		value: localStorage.getItem("empList") ? JSON.parse(localStorage.getItem("empList")) : [],
	},
	reducers: {
		addEmployee: (state, action) => {
			state.value = [...state.value, action.payload];
			localStorage.setItem("empList", JSON.stringify(state.value));
		},

		updateEmployee: (state, action) => {
			state.value = state.value.map((employee) => (employee.id === action.payload.id ? { ...employee, ...action.payload } : employee));
			localStorage.setItem("empList", JSON.stringify(state.value));
		},
		deleteEmployee: (state, action) => {
			state.value = state.value.filter((employee) => employee.id !== action.payload);
			localStorage.setItem("emplist", JSON.stringify(state.value));
		},

		salaryIncrement: (state, action) => {
			state.value = { ...action.payload };
			localStorage.setItem("emplist", JSON.stringify(state.value));
		},

	},
});

// Action creators are generated for each case reducer function
export const { addEmployee, updateEmployee, deleteEmployee, salaryIncrement } = AddEmployeSlice.actions;

export default AddEmployeSlice.reducer;
