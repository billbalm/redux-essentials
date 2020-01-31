export function clone(object) {
  return Array.isArray(object) ? [...object] : { ...object };
}

export function del(object, path) {
  if (!Array.isArray(path) || path.length === 0) {
    throw new TypeError('Invalid arguments');
  }
  let newObject = { ...object };
  let obj = newObject;
  for (let i = 0; i < path.length - 1; i++) {
    if (!(path[i] in obj)) {
      return object;
    }
    obj = obj[path[i]] = { ...obj[path[i]] };
  }
  const prop = path[path.length - 1];
  if (prop in obj) {
    delete obj[prop];
    return newObject;
  }
  return object;
}

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

export function set(object, path, value) {
  if (!Array.isArray(path) || path.length === 0) {
    throw new TypeError('Invalid arguments');
  }
  let obj = object = clone(object);
  for (let i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]] = path[i] in obj ? clone(obj[path[i]]) : path[i + 1] === 0 ? [] : {};
  }
  obj[path[path.length - 1]] = value;
  return object;
}

export default { del, get, set };
