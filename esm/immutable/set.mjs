import { clone } from './clone.mjs';

export function set(object, path, value) {
  if (!Array.isArray(path) || path.length === 0) {
    throw new TypeError('Invalid arguments');
  }
  let obj = object = clone(object);
  for (let i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]] = path[i] in obj
      ? clone(obj[path[i]])
      : Number.isInteger(path[i + 1]) ? [] : {};
  }
  obj[path[path.length - 1]] = value;
  return object;
}

export default set;
