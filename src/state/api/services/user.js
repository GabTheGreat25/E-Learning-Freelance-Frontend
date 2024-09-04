import { PATH, METHOD, TAGS } from "@constants";

export const registerUser = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.REGISTER,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const resendOTP = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.SEND_VERIFICATION,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const verifyOTP = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.VERIFICATION,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const loginUser = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.LOGIN,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const getProfile = (builder) =>
  builder.query({
    query: () => ({
      url: PATH.ME,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.USER],
  });

export const updatePassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.CHANGE_PASSWORD,
      method: METHOD.PUT,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const updateProfile = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.UPDATE_PROFILE,
      method: METHOD.PUT,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const forgotPassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.FORGOT_PASSWORD,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const resetPassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.RESET_PASSWORD,
      method: METHOD.PUT,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });
