export const matchParams = (route, params) => {
  const keys = Object.keys(params);
  let path = route;
  keys.forEach(key => {
    path = path.replace(`:${key}`, params[key]);
  });
  return path;
};