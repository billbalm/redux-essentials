import { del } from './immutable/del.mjs';
import { get } from './immutable/get.mjs';
import { set } from './immutable/set.mjs';
import { BATCH, ADD_VALUE, DEL_VALUE, MOVE_VALUE, SET_VALUE } from './actions.mjs';

export function values(state = {}, action) {
  switch (action && action.type) {
  case BATCH: {
    const { payload } = action;
    if (Array.isArray(payload)) {
      return payload.reduce((state, action) => values(state, action), state);
    }
    return state;
  }
  case ADD_VALUE: {
    const { payload: { index, path, value } } = action;
    const array = get(state, path, []);
    if (Array.isArray(array)) {
      const i = isNaN(index) ? array.length : index;
      return set(state, path, [...array.slice(0, i), value, ...array.slice(i)]);
    }
    return state;
  }
  case DEL_VALUE: {
    const { payload: { index, path } } = action;
    if (typeof index === 'undefined') {
      return del(state, path);
    }
    const array = get(state, path, []);
    const i = parseInt(index);
    if (Array.isArray(array) && i >= -array.length && i < array.length) {
      return set(state, path, [...array.slice(0, i), ...array.slice(i + 1 || array.length)]);
    }
    return state;
  }
  case MOVE_VALUE: {
    const { payload: { fromIndex, path, toIndex } } = action;
    const array = get(state, path, []);
    if (Array.isArray(array)) {
      let from = parseInt(fromIndex);
      let to = parseInt(toIndex);
      if (from < 0) {
        from += array.length;
      }
      if (to < 0) {
        to += array.length;
      }
      if (from !== to && from >= 0 && from < array.length && to >= 0 && to < array.length) {
        return set(state, path, from < to
          ? [...array.slice(0, from), ...array.slice(from + 1, to + 1), array[from], ...array.slice(to + 1)]
          : [...array.slice(0, to), array[from], ...array.slice(to, from), ...array.slice(from + 1)]
        );
      }
    }
    return state;
  }
  case SET_VALUE: {
    const { payload: { path, value } } = action;
    return set(state, path, value);
  }
  default:
    return state;
  }
}

export default { values };
