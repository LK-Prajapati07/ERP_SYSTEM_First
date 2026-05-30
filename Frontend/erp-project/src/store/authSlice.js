import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  Auth: false,

  user: null,

  role: null,

  isloading: false
};

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

    setUser: (state, action) => {

      state.user = action.payload.user;

      state.role = action.payload.role;

      state.Auth = true;

      state.isloading = false;
    },

    logoutUser: (state) => {

      state.Auth = false;

      state.user = null;

      state.role = null;

      state.isloading = false;
    },

    setLoading: (state) => {

      state.isloading = true;
    },

    stopLoading: (state) => {

      state.isloading = false;
    }
  }
});

export const {

  setUser,

  logoutUser,

  setLoading,

  stopLoading

} = authSlice.actions;

export default authSlice.reducer;