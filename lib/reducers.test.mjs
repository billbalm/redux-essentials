import { addValue, delValue, moveValue, setValue } from './actions';
import { values } from './reducers';

describe('values', function() {
  it('creates new state at first', function() {
    expect(values()).toEqual({});
  });
  describe('action addValue', function() {
    it('changes state as expected', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: [{ a: 'ABA1A'}], b: ['ABB1'] } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, addValue(['a', 'b', 'a'], { a: 'ABA2A' }));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).toBe(state.a.a);
      expect(newState.a.b).not.toBe(state.a.b);
      expect(newState.a.b.a).not.toBe(state.a.b.a);
      expect(state.a.b.a).toHaveLength(1);
      expect(newState.a.b.a).toHaveLength(2);
      expect(newState.a.b.a[0]).toBe(state.a.b.a[0]);
      expect(newState.a.b.a[1]).toEqual({ a: 'ABA2A' });
      expect(newState.a.b.b).toBe(state.a.b.b);
      expect(newState.b).toBe(state.b);
    });
    it('changes state as expected when index is given', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: [{ a: 'ABA1A'}], b: ['ABB1'] } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, addValue(['a', 'b', 'a'], { a: 'ABA0A' }, 0));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).toBe(state.a.a);
      expect(newState.a.b).not.toBe(state.a.b);
      expect(newState.a.b.a).not.toBe(state.a.b.a);
      expect(state.a.b.a).toHaveLength(1);
      expect(newState.a.b.a).toHaveLength(2);
      expect(newState.a.b.a[0]).toEqual({ a: 'ABA0A' });
      expect(newState.a.b.a[1]).toBe(state.a.b.a[0]);
      expect(newState.a.b.b).toBe(state.a.b.b);
      expect(newState.b).toBe(state.b);
    });
    it('changes state as expected when negative index is given', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: [{ a: 'ABA1A'}], b: ['ABB1'] } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, addValue(['a', 'b', 'a'], { a: 'ABA0A' }, -1));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).toBe(state.a.a);
      expect(newState.a.b).not.toBe(state.a.b);
      expect(newState.a.b.a).not.toBe(state.a.b.a);
      expect(state.a.b.a).toHaveLength(1);
      expect(newState.a.b.a).toHaveLength(2);
      expect(newState.a.b.a[0]).toEqual({ a: 'ABA0A' });
      expect(newState.a.b.a[1]).toBe(state.a.b.a[0]);
      expect(newState.a.b.b).toBe(state.a.b.b);
      expect(newState.b).toBe(state.b);
    });
    it('changes state as expected when given index is greater than array length', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: [{ a: 'ABA1A'}], b: ['ABB1'] } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, addValue(['a', 'b', 'a'], { a: 'ABA2A' }, 2));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).toBe(state.a.a);
      expect(newState.a.b).not.toBe(state.a.b);
      expect(newState.a.b.a).not.toBe(state.a.b.a);
      expect(state.a.b.a).toHaveLength(1);
      expect(newState.a.b.a).toHaveLength(2);
      expect(newState.a.b.a[0]).toBe(state.a.b.a[0]);
      expect(newState.a.b.a[1]).toEqual({ a: 'ABA2A' });
      expect(newState.a.b.b).toBe(state.a.b.b);
      expect(newState.b).toBe(state.b);
    });
    it('changes state as expected with inexistent path', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { b: ['ABB1'] } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, addValue(['a', 'b', 'a'], { a: 'ABA2A' }));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).toBe(state.a.a);
      expect(newState.a.b).not.toBe(state.a.b);
      expect(state.a.b.a).toBeUndefined();
      expect(Array.isArray(newState.a.b.a)).toBe(true);
      expect(newState.a.b.a).toHaveLength(1);
      expect(newState.a.b.a).toEqual([{ a: 'ABA2A' }]);
      expect(newState.a.b.b).toBe(state.a.b.b);
      expect(newState.b).toBe(state.b);
    });
    it('does not change state with existent path not pointing to an array', function() {
      const state = {
        a: { a: { a: 'AAA' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, addValue(['a', 'a', 'a'], 'AAA:Modified'));
      expect(newState).toBe(state);
    });
  });
  describe('action delValue', function() {
    it('changes state as expected', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: 'ABA', b: 'ABB' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, delValue(['a', 'b']));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).toBe(state.a.a);
      expect(state.a.b).toBeDefined();
      expect(newState.a.b).toBeUndefined();
      expect(newState.b).toBe(state.b);
    });
    it('changes state as expected when index is given', function() {
      const state = {
        a: { a: { a: ['AAA1', 'AAA2', 'AAA3'] }, b: { a: 'ABA' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, delValue(['a', 'a', 'a'], 1));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).not.toBe(state.a.a);
      expect(newState.a.a.a).not.toBe(state.a.a.a);
      expect(state.a.a.a).toEqual(['AAA1', 'AAA2', 'AAA3']);
      expect(newState.a.a.a).toEqual(['AAA1', 'AAA3']);
      expect(newState.a.b).toBe(state.a.b);
      expect(newState.b).toBe(state.b);
    });
    it('changes state as expected when a negative index is given', function() {
      const state = {
        a: { a: { a: ['AAA1', 'AAA2', 'AAA3'] }, b: { a: 'ABA' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, delValue(['a', 'a', 'a'], -2));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).not.toBe(state.a.a);
      expect(newState.a.a.a).not.toBe(state.a.a.a);
      expect(state.a.a.a).toEqual(['AAA1', 'AAA2', 'AAA3']);
      expect(newState.a.a.a).toEqual(['AAA1', 'AAA3']);
      expect(newState.a.b).toBe(state.a.b);
      expect(newState.b).toBe(state.b);
    });
    it('changes state as expected when a index of "-1" is given', function() {
      const state = {
        a: { a: { a: ['AAA1', 'AAA2', 'AAA3'] }, b: { a: 'ABA' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, delValue(['a', 'a', 'a'], '-1'));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).not.toBe(state.a.a);
      expect(newState.a.a.a).not.toBe(state.a.a.a);
      expect(state.a.a.a).toEqual(['AAA1', 'AAA2', 'AAA3']);
      expect(newState.a.a.a).toEqual(['AAA1', 'AAA2']);
      expect(newState.a.b).toBe(state.a.b);
      expect(newState.b).toBe(state.b);
    });
    it('does not change state with inexistent path', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: 'ABA', b: 'ABB' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, delValue(['b', 'b']));
      expect(newState).toBe(state);
    });
    it('does not change state with inexistent path and index given', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: 'ABA', b: 'ABB' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, delValue(['b', 'b'], 0));
      expect(newState).toBe(state);
    });
    it('does not change state with invalid index given', function() {
      const state = {
        a: { a: { a: ['AAA1', 'AAA2', 'AAA3'] }, b: { a: 'ABA' } },
        b: { a: { a: 'BAA' } },
      };
      expect(values(state, delValue(['a', 'a', 'a'], '--1'))).toBe(state);
      expect(values(state, delValue(['a', 'a', 'a'], 'a0'))).toBe(state);
    });
    it('does not change state with out of bounds index given', function() {
      const state = {
        a: { a: { a: ['AAA1', 'AAA2', 'AAA3'] }, b: { a: 'ABA' } },
        b: { a: { a: 'BAA' } },
      };
      expect(values(state, delValue(['a', 'a', 'a'], -4))).toBe(state);
      expect(values(state, delValue(['a', 'a', 'a'], 3))).toBe(state);
    });
  });
  describe('action moveValue', function() {
    it('changes state as expected', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: [{ a: 'ABA1A'}, { a: 'ABA2A'}, { a: 'ABA3A'}] } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, moveValue(['a', 'b', 'a'], 2, 0));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).toBe(state.a.a);
      expect(newState.a.b).not.toBe(state.a.b);
      expect(newState.a.b.a).not.toBe(state.a.b.a);
      expect(newState.a.b.a[0]).toBe(state.a.b.a[2]);
      expect(newState.a.b.a[1]).toBe(state.a.b.a[0]);
      expect(newState.a.b.a[2]).toBe(state.a.b.a[1]);
      expect(newState.a.b.b).toBe(state.a.b.b);
      expect(newState.b).toBe(state.b);
    });
    it('changes state as expected with negative indexes as string', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: [{ a: 'ABA1A'}, { a: 'ABA2A'}, { a: 'ABA3A'}] } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, moveValue(['a', 'b', 'a'], '-3', '-1'));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).toBe(state.a.a);
      expect(newState.a.b).not.toBe(state.a.b);
      expect(newState.a.b.a).not.toBe(state.a.b.a);
      expect(newState.a.b.a[0]).toBe(state.a.b.a[1]);
      expect(newState.a.b.a[1]).toBe(state.a.b.a[2]);
      expect(newState.a.b.a[2]).toBe(state.a.b.a[0]);
      expect(newState.a.b.b).toBe(state.a.b.b);
      expect(newState.b).toBe(state.b);
    });
    it('does not change state with inexistent path', function() {
      const state = {
        a: { a: { a: 'AAA' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, moveValue(['b', 'b'], 0, 1));
      expect(newState).toBe(state);
    });
    it('does not change state if value at path is not array', function() {
      const state = {
        a: { a: { a: { 0: 'AAA1', 1: 'AAA2' } } },
      };
      const newState = values(state, moveValue(['a', 'a', 'a'], 0, 1));
      expect(newState).toBe(state);
    });
    it('does not change state with some invalid index given', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: [{ a: 'ABA1A'}, { a: 'ABA2A'}, { a: 'ABA3A'}] } },
        b: { a: { a: 'BAA' } },
      };
      expect(values(state, moveValue(['a', 'b', 'a'], '--1', 0))).toBe(state);
      expect(values(state, moveValue(['a', 'b', 'a'], 0, 'a1'))).toBe(state);
    });
    it('does not change state with some out of bounds index given', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: [{ a: 'ABA1A'}, { a: 'ABA2A'}, { a: 'ABA3A'}] } },
        b: { a: { a: 'BAA' } },
      };
      expect(values(state, moveValue(['a', 'b', 'a'], -4, 0))).toBe(state);
      expect(values(state, moveValue(['a', 'b', 'a'], 3, 0))).toBe(state);
    });
    it('does not change state with equal indexes given', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: [{ a: 'ABA1A'}, { a: 'ABA2A'}, { a: 'ABA3A'}] } },
        b: { a: { a: 'BAA' } },
      };
      expect(values(state, moveValue(['a', 'b', 'a'], 1, 1))).toBe(state);
      expect(values(state, moveValue(['a', 'b', 'a'], -2, 1))).toBe(state);
    });
  });
  describe('action setValue', function() {
    it('changes state as expected', function() {
      const state = {
        a: { a: { a: 'AAA' }, b: { a: 'ABA', b: 'ABB' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, setValue(['b', 'b', 'a'], 'BBA:Modified'));
      expect(newState).not.toBe(state);
      expect(newState.a).toBe(state.a);
      expect(newState.b).not.toBe(state.b);
      expect(newState.b.a).toBe(state.b.a);
      expect(newState.b.b).toEqual({ a: 'BBA:Modified' });
    });
    it('changes state as expected with inexistent path', function() {
      const state = {
        a: { a: { a: 'AAA' } },
        b: { a: { a: 'BAA' } },
      };
      const newState = values(state, setValue(['a', 'b', 'a'], 'ABA'));
      expect(newState).not.toBe(state);
      expect(newState.a).not.toBe(state.a);
      expect(newState.a.a).toBe(state.a.a);
      expect(state.a.b).toBeUndefined();
      expect(newState.a.b).toBeDefined();
      expect(newState.a.b.a).toEqual('ABA');
      expect(newState.b).toBe(state.b);
    });
  });
  it('does not change state with unknown action type', function() {
    const state = { a: { a: { a: 'AAA' } } };
    expect(values(state, { type: 'UNKNOWN' })).toBe(state);
  });
});
