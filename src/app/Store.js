import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Features/AuthSlice";
import { AddEmployeSlice } from "../Features/AddEmploye";
import { ProjectSlice } from "../Features/ProjectSclice";
import { LeaveSclice } from "../Features/LeaveSclice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    employee: AddEmployeSlice.reducer,
    project: ProjectSlice.reducer,
    leave: LeaveSclice.reducer,
  },
});

export const dispatchEvent = (event) => store.dispatch(event);
