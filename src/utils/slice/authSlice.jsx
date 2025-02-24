import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Swal from "sweetalert2";

import authApi from "../../api/authApi";
import userApi from "../../api/userApi";

// 登入
export const login = createAsyncThunk(
  "auth/login",
  async (userFormData, { rejectWithValue }) => {
    try {
      const response = await authApi.login(userFormData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 驗證身分
export const loginCheck = createAsyncThunk(
  "auth/loginCheck",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.loginCheck();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// 取得使用者資料
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserData();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// 切換角色
export const changeUserRole = createAsyncThunk(
  "auth/changeUserRole",
  async (userData, { rejectWithValue }) => {
    try {
      const newRole =
        userData.last_active_role === "student" ? "tutor" : "student";
      const response = await userApi.changeUserRole(newRole);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    userData: {},
  },
  reducers: {
    logout(state) {
      document.cookie = "authToken=; path=/; expires=;";

      Swal.fire({
        title: "已登出",
        icon: "success",
      });

      state.isAuth = false;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(loginCheck.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.userData.last_active_role = action.payload.user.last_active_role;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isAuth = false;
          state.error = action.payload?.data?.message || "發生錯誤";
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
