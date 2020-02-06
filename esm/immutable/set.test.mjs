import { set } from './set.mjs';

describe('set', function() {
  it('sets value as expected', function() {
    const object = {
      a: { a: { a: 'AAA' }, b: [{ a: 'AB1A', b: 'AB1B' }, { a: 'AB2A' }] },
      b: { a: { a: 'BAA' } },
    };
    const actual = set(object, ['a', 'b', 0, 'a'], 'AB1A:Modified');
    expect(actual).not.toBe(object);
    expect(actual.a).not.toBe(object.a);
    expect(actual.a.a).toBe(object.a.a);
    expect(actual.a.b).not.toBe(object.a.b);
    expect(actual.a.b).toBeInstanceOf(Array);
    expect(actual.a.b[0]).not.toBe(object.a.b[0]);
    expect(actual.a.b[1]).toBe(object.a.b[1]);
    expect(actual.a.b[0].a).not.toEqual(object.a.b[0].a);
    expect(actual.a.b[0].a).toEqual('AB1A:Modified');
    expect(actual.a.b[0].b).toBe(object.a.b[0].b);
    expect(actual.b).toBe(object.b);
  });
  it('creates intermediate props to set value', function() {
    const object = {
      a: { a: { a: 'AAA' } },
      b: { a: { a: 'BAA' } },
    };
    const actual = set(object, ['b', 'b', 0, 'a'], 'BB1A');
    expect(actual).not.toBe(object);
    expect(actual.a).toBe(object.a);
    expect(actual.b).not.toBe(object.b);
    expect(actual.b.a).toBe(object.b.a);
    expect(actual.b.b).toBeDefined();
    expect(actual.b.b).toBeInstanceOf(Array);
    expect(actual.b.b).toHaveLength(1);
    expect(actual.b.b).toEqual([{ a: 'BB1A' }]);
    expect(object.b.b).toBeUndefined();
  });
  it('throws expected error when path is not array', function() {
    expect(() => set({}, {}, 'VALUE')).toThrow(new TypeError('Invalid arguments'));
  });
  it('throws expected error when path is empty', function() {
    expect(() => set({}, [], 'VALUE')).toThrow(new TypeError('Invalid arguments'));
  });
});
