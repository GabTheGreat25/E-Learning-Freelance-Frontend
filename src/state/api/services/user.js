export const registerUser = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: "/register",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const resendOTP = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: "/send/verification",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const verifyOTP = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: "/verification",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const loginUser = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: "/login",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const getProfile = (builder) =>
  builder.query({
    query: () => ({
      url: "/me",
      method: "GET",
    }),
    providesTags: ["User"],
  });

export const updatePassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: "/me/changePassword",
      method: "PUT",
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const updateProfile = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: "/me/update",
      method: "PUT",
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const forgotPassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: "/password/forgot",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: ["User"],
  });

export const resetPassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: "/password/reset",
      method: "PUT",
      body: payload,
    }),
    invalidatesTags: ["User"],
  });
