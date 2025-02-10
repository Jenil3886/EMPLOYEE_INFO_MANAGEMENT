import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const AuthSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
