import { clone, del, get, set } from './object';

describe('clone', function() {
  it('clones object as expected', function() {
    const object = {
      a: { a: { a: 'AAA' } },
      b: { a: { a: 'BAA' } },
    };
    const actual = clone(object);
    expect(actual).not.toBe(object);
    expect(actual).toEqual(object);
    expect(actual.a).toBe(object.a);
    expect(actual.b).toBe(object.b);
  });
  it('clones array as expected', function() {
    const array = [
      { a: { a: 'AAA' } },
      { a: { a: 'BAA' } },
    ];
    const actual = clone(array);
    expect(actual).not.toBe(array);
    expect(actual).toEqual(array);
    expect(actual[0]).toBe(array[0]);
    expect(actual[1]).toBe(array[1]);
  });
});
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
