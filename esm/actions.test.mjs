import { addValue, delValue, setValue } from './actions.mjs';

describe('addValue', function() {
  it('creates action as expected', function() {
    expect(addValue('some-path', 'some-value', 123)).toEqual({
      payload: { index: 123, path: 'some-path', value: 'some-value' },
      type: 'ADD VALUE',
    });
  });
});

describe('delValue', function() {
  it('creates action as expected', function() {
    expect(delValue('some-path', 123)).toEqual({
      payload: { index: 123, path: 'some-path' },
      type: 'DEL VALUE',
    });
  });
});

describe('setValue', function() {
  it('creates action as expected', function() {
    expect(setValue('some-path', 'some-value', true)).toEqual({
      payload: { merge: true, path: 'some-path', value: 'some-value' },
      type: 'SET VALUE',
    });
  });
  it('creates action as expected with default merge option', function() {
    expect(setValue('some-path', 'some-value')).toEqual({
      payload: { merge: false, path: 'some-path', value: 'some-value' },
      type: 'SET VALUE',
    });
  });
});
