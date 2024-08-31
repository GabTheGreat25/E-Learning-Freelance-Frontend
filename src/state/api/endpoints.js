import { UserApi } from "./services";

export const generateEndpoints = (builder) => {
  const endpoints = {};

  Object.keys(UserApi).forEach((key) => {
    endpoints[key] = UserApi[key](builder);
  });

  return endpoints;
};
