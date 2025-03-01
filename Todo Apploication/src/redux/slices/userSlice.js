import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../api/userApi";

export const login = createAsyncThunk("user/login", async (userData) => {
  const response = await loginUser(userData);
  localStorage.setItem("token", response.token);
  localStorage.setItem("user", JSON.stringify(response.user));
  return response.user;
});

export const signup = createAsyncThunk("user/signup", async (userData) => {
  const response = await registerUser(userData);
  localStorage.setItem("token", response.token);
  localStorage.setItem("user", JSON.stringify(response.user));
  return response.user;
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return { type: "user/logout" };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export default userSlice.reducer;
