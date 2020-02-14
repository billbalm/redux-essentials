import { clone } from './clone.mjs';

export function del(object, path) {
  if (!Array.isArray(path) || path.length === 0) {
    throw new TypeError('Invalid arguments');
  }
  let newObject = clone(object);
  let obj = newObject;
  for (let i = 0; i < path.length - 1; i++) {
    if (!(path[i] in obj)) {
      return object;
    }
    obj = obj[path[i]] = clone(obj[path[i]]);
  }
  const prop = path[path.length - 1];
  if (prop in obj) {
    delete obj[prop];
    return newObject;
  }
  return object;
}

export default del;
