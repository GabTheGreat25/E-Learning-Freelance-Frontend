import { PATH, METHOD } from "@constants";

export const registerUser = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.REGISTER,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const resendOTP = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.SEND_VERIFICATION,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const verifyOTP = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.VERIFICATION,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const loginUser = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.LOGIN,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const getProfile = (builder) =>
  builder.query({
    query: () => ({
      url: PATH.ME,
      method: METHOD.GET,
    }),
    providesTags: ["User"],
  });

export const updatePassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.CHANGE_PASSWORD,
      method: METHOD.PUT,
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const updateProfile = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.UPDATE_PROFILE,
      method: METHOD.PUT,
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const forgotPassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.FORGOT_PASSWORD,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const resetPassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.RESET_PASSWORD,
      method: METHOD.PUT,
      body: payload,
    }),
    invalidatesTags: ["User"],
  });
