export function clone(object) {
  return Array.isArray(object) ? [...object] : { ...object };
}

export default clone;
