import { createSlice } from "@reduxjs/toolkit";
import { TAGS } from "@constants";

const profileSlice = createSlice({
  name: TAGS.PROFILE,
  initialState: {
    formData: {
      mobileNumber: "",
      birthDate: "",
      gender: null,
      country: null,
      province: null,
      city: null,
      address: "",
    },
  },
  reducers: {
    updateProfileData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    clearProfileData(state) {
      state.formData = {
        mobileNumber: "",
        birthDate: "",
        gender: null,
        country: null,
        province: null,
        city: null,
        address: "",
      };
    },
  },
});

export const profileActions = profileSlice.actions;
export const profile = profileSlice.reducer;
