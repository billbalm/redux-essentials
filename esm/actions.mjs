export const BATCH = 'BATCH';
export const ADD_VALUE = 'ADD VALUE';
export const DEL_VALUE = 'DEL VALUE';
export const MOVE_VALUE = 'MOVE_VALUE';
export const SET_VALUE = 'SET VALUE';

export const batch = actions => ({ payload: actions, type: BATCH });
export const addValue = (path, value, index) => ({ payload: { index, path, value, }, type: ADD_VALUE });
export const delValue = (path, index) => ({ payload: { index, path }, type: DEL_VALUE });
export const moveValue = (path, fromIndex, toIndex) => ({ payload: { fromIndex, path, toIndex }, type: MOVE_VALUE });
export const setValue = (path, value) => ({ payload: { path, value }, type: SET_VALUE });

export default { BATCH, ADD_VALUE, DEL_VALUE, MOVE_VALUE, SET_VALUE, batch, addValue, delValue, moveValue, setValue };
