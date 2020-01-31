import { addValue, delValue, setValue } from './actions';

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
    expect(setValue('some-path', 'some-value')).toEqual({
      payload: { path: 'some-path', value: 'some-value' },
      type: 'SET VALUE',
    });
  });
});
