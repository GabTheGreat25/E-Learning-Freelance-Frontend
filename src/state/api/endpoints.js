import { UserApi, CarouselApi } from "./services";

export const generateEndpoints = (builder) => {
  const endpoints = {};
  const combinedApis = { ...UserApi, ...CarouselApi };

  Object.keys(combinedApis).forEach((key) => {
    endpoints[key] = combinedApis[key](builder);
  });

  return endpoints;
};
