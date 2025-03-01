import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser ,registerUser} from "../../api/userApi";

export const login = createAsyncThunk("user/login", async (userData) => {
  const response = await loginUser(userData);

  if (response?.data && response?.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
});

export const signup = createAsyncThunk("users/register", async (userData) => {
  const response = await registerUser(userData);

  if (response?.data && response?.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return null;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});


export default userSlice.reducer;
