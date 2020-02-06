import { get } from './get.mjs';

describe('get', function() {
  it('gets value as expected', function() {
    const object = {
      a: { a: { a: 'AAA' }, b: { a: 'ABA', b: 'ABB' } },
      b: { a: { a: 'BAA' } },
    };
    expect(get(object, ['a', 'b'])).toBe(object.a.b);
    expect(get(object, ['a', 'b', 'a'])).toEqual('ABA');
  });
  it('gets undefined when path does not exist', function() {
    const object = {
      a: { a: { a: 'AAA' } },
      b: { a: { a: 'BAA' } },
    };
    expect(get(object, ['a', 'c'])).toBeUndefined();
  });
  it('gets default value when path does not exist', function() {
    const object = {
      a: { a: { a: 'AAA' } },
      b: { a: { a: 'BAA' } },
    };
    expect(get(object, ['a', 'c'], 'AC')).toEqual('AC');
  });
  it('does not get default value when prop at path is set to undefined', function() {
    const object = {
      a: { a: { a: 'AAA', b: undefined } },
      b: { a: { a: 'BAA' } },
    };
    expect(get(object, ['a', 'a', 'b'], 'AAB')).toBeUndefined();
  });
  it('gets object itself when path is empty', function() {
    const object = {
      a: { a: { a: 'AAA' } },
      b: { a: { a: 'BAA' } },
    };
    expect(get(object, [])).toBe(object);
  });
  it('throws expected error when path is not array', function() {
    expect(() => get({}, {})).toThrow(new TypeError('Invalid arguments'));
  });
});
