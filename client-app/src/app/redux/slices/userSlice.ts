import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { setToken } from "./commonSlice"; // Assuming commonSlice is set up for token management.
import { User, UserLoginValues } from "../../models/identity/user";
import agent from "../../api/agent";

interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  user: null,
  status: "idle",
};

// Async Thunks
export const login = createAsyncThunk(
  "user/login",
  async (creds: UserLoginValues, { dispatch, rejectWithValue }) => {
    try {
      const user = await agent.Account.login(creds);
      dispatch(setToken(user.token));
      return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      return await agent.Account.current();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        console.error("Login failed:", action.payload);
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        console.error("Get user failed:", action.payload);
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
