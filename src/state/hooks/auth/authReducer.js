import { createSlice } from "@reduxjs/toolkit";
import { api } from "@api";
import { TAGS } from "@constants";

const authSlice = createSlice({
  name: TAGS.AUTH,
  initialState: {
    token: "",
    user: {},
    authenticated: false,
  },
  reducers: {
    logout(state) {
      state.token = "";
      state.user = {};
      state.authenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        if (payload?.success === true) {
          state.token = payload.token;
          state.authenticated = true;
          state.user = {
            ...payload.user,
          };
        }
      },
    );
  },
});

export const authActions = authSlice.actions;
export const auth = authSlice.reducer;
