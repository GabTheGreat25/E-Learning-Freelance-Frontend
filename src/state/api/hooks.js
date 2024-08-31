export const generateHooks = (api) => {
  const hooks = {};

  Object.keys(api.endpoints).forEach((endpoint) => {
    const hookName = `use${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}${api.endpoints[endpoint].type === "query" ? "Query" : "Mutation"}`;
    hooks[hookName] = api[hookName];
  });

  return hooks;
};
