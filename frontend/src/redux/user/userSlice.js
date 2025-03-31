import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  onlineUsers: [],
  selectedUser: null,
  calling: false,
  isDoctor: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserSuccess: (state, action) => {
      state.currentUser.profilePicture = action.payload;
      state.loading = false;
      state.error = null;
      state.calling = false;
    },
    updateSuccess: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.calling = false;
    },
    logoutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.onlineUsers = [];
      state.selectedUser = null;
      state.calling = false;
      state.isDoctor = null;
    },
    authenticateState: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = { ...action.payload };
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setCalling: (state, action) => {
      state.calling = action.payload;
    },
    setUserRole: (state, action) => {
      state.isDoctor = action.payload === "doctor";
    },
  },
});

export const {
  updateUserSuccess,
  logoutUserSuccess,
  authenticateState,
  setOnlineUsers,
  setSelectedUser,
  setCalling,
  updateSuccess,
  setUserRole,
} = userSlice.actions;

export default userSlice.reducer;
