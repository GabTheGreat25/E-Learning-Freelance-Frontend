import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api/reducer";
import { location, auth, profile } from "./hooks";

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  location,
  auth,
  profile,
});
