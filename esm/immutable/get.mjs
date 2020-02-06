export function get(object, path, defaultValue) {
  if (!Array.isArray(path)) {
    throw new TypeError('Invalid arguments');
  }
  let obj = object;
  for (let i = 0; i < path.length; i++) {
    if (!(path[i] in obj)) {
      return defaultValue;
    }
    obj = obj[path[i]];
  }
  return obj;
}

export default get;
