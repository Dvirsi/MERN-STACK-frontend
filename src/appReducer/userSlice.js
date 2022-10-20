import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  loginStatus: false,
  authenticateError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      sessionStorage["username"] = action.payload;
      state.username = action.payload;
      state.loginStatus = true;
    },

    logout: (state, action) => {
      sessionStorage["username"] = "";
      state.username = "";
      state.loginStatus = false;
    },

    authenticateError: (state, action) => {
      state.authenticateError = action.payload;
    },
  },
});

export const selectUsername = (state) => state.user.username;
export const selectLoginStatus = (state) => state.user.loginStatus;
export const selectAuthenticateError = (state) => state.user.authenticateError;

export const { login, logout, authenticateError } = userSlice.actions;
export default userSlice;
