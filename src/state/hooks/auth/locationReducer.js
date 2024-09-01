import { createSlice } from "@reduxjs/toolkit";
import { TAGS } from "@constants";

const locationSlice = createSlice({
  name: TAGS.LOCATION,
  initialState: {
    formData: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  },
  reducers: {
    updateFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    clearFormData(state) {
      state.formData = {
        firstname: "",
        lastname: "",
        email: state.formData.email,
        password: "",
      };
    },
    clearEmailForm(state) {
      state.formData.email = "";
    },
  },
});

export const locationActions = locationSlice.actions;
export const location = locationSlice.reducer;
