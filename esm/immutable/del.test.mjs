import { del } from './del.mjs';

describe('del', function() {
  it('deletes value as expected', function() {
    const object = {
      a: { a: { a: 'AAA' }, b: { a: 'ABA', b: 'ABB' } },
      b: { a: { a: 'BAA' } },
    };
    const actual = del(object, ['a', 'b', 'a']);
    expect(actual).not.toBe(object);
    expect(actual.a).not.toBe(object.a);
    expect(actual.a.a).toBe(object.a.a);
    expect(actual.a.a.a).toBe(object.a.a.a);
    expect(actual.a.b).not.toBe(object.a.b);
    expect(actual.a.b.a).not.toEqual(object.a.b.a);
    expect(actual.a.b.a).toBeUndefined();
    expect(actual.b).toBe(object.b);
    expect(actual.b.a).toBe(object.b.a);
    expect(actual.b.a.a).toBe(object.b.a.a);
  });
  it('does not change object when path does not exist', function() {
    const object = {
      a: { a: { a: 'AAA' } },
      b: { a: { a: 'BAA' } },
    };
    expect(del(object, ['b', 'b', 'a'])).toBe(object);
    expect(del(object, ['b', 'a', 'b'])).toBe(object);
  });
  it('throws expected error when path is not array', function() {
    expect(() => del({}, {})).toThrow(new TypeError('Invalid arguments'));
  });
  it('throws expected error when path is empty', function() {
    expect(() => del({}, [])).toThrow(new TypeError('Invalid arguments'));
  });
});
