import { clone } from './clone.mjs';

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
