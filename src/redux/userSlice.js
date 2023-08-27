import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarios: [],
  user: null,
  isLoading: true,
  token: null,
  error: null
 
};

export const userSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    error: (state, action) => {
      state.error = action.payload.error
      state.user = null;
      state.token = null;
      state.isLoading = false;
    },
    setUsuarios: (state, action) => {
      state.usuarios = action.payload.usuarios;
      state.isLoading = false;
    },
  },
});

export const { login, logout, startLoading, endLoading, error, setUsuarios } = userSlice.actions;

export default userSlice.reducer;
