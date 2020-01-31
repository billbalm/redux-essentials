[![npm][npm]][npm-url]
[![node][node]][node-url]
[![license][license]][license-url]

# redux-essentials

Essential actions and reducers to be used with [Redux].

It creates a `values` entry in the state that can be mutated via 4 actions:
- `ADD VALUE`: adds an element to an array at a give path at a given position
- `DEL VALUE`: deletes an object property or removes an element from an array
- `MOVE_VALUE`: moves an element within an array
- `SET VALUE`: sets a value at a give path

Action object are created by calling the methods in the `actions` module/export.

The state is proper immutable. The `object` module/export is used to mutate the
state object without actually changing it.

## Example

```js
import assert from 'assert';
import { combineReducers, createStore } from 'redux';
import { actions, reducers } from './redux-essentials';

// creates a brand new store
const store = createStore(combineReducers(reducers));

// set a value deep in the state
store.dispatch(actions.setValue(['cat', 'name'], 'Melinda'));

// throw if cat name isn't 'Melinda'
assert.equal(store.getState().values.cat.name, 'Melinda');

// set a value of type array deep in the state
store.dispatch(actions.setValue(['cat', 'food'], []));

// append some values to the array
store.dispatch(actions.addValue(['cat', 'food'], 'biscuit'));
store.dispatch(actions.addValue(['cat', 'food'], 'meat'));
// insert a value at a specific position in the array
store.dispatch(actions.addValue(['cat', 'food'], 'fish', 1));

// throw if food isn't an array exactly like expected
assert.deepEqual(store.getState().values.cat.food, ['biscuit','fish','meat']);

// move meat to the beginning of the array
store.dispatch(actions.moveValue(['cat', 'food'], 2, 0));
// remove 2nd item (biscuit) from the array
store.dispatch(actions.delValue(['cat', 'food'], 1));

// throw if food isn't an array exactly like expected
assert.deepEqual(store.getState().values.cat.food, ['meat','fish']);
```

## Maintainer

| [![billbalm-avatar]][billbalm] |
|:------------------------------:|
| [Bill Balmant]                 |

<!-- References -->
[Redux]: https://redux.js.org
[npm]: https://img.shields.io/npm/v/redux-essentials.svg
[npm-url]: https://npmjs.com/package/redux-essentials
[node]: https://img.shields.io/node/v/redux-essentials.svg
[node-url]: https://nodejs.org
[license]: https://img.shields.io/npm/l/redux-essentials.svg
[license-url]: https://github.com/billbalm/redux-essentials/raw/master/LICENSE.md
[billbalm]: https://github.com/billbalm
[Bill Balmant]: https://github.com/billbalm
[billbalm-avatar]: https://avatars3.githubusercontent.com/u/60496754?s=200&v=4
