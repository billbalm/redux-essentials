import { clone } from './clone.mjs';

export function set(object, path, value, merge = false) {
  if (!Array.isArray(path) || path.length === 0) {
    throw new TypeError('Invalid arguments');
  }
  let i = 0, obj = object = clone(object);
  for (const len = path.length; i < len - 1; i++) {
    obj = obj[path[i]] = path[i] in obj ? clone(obj[path[i]]) : Number.isInteger(path[i + 1]) ? [] : {};
  }
  obj[path[i]] = obj[path[i]] && merge ? { ...obj[path[i]], ...value } : value;
  return object;
}

export default set;
