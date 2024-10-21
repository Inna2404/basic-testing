// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },

  // continue cases for other actions
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `should return $expected for $a $action $b`,
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      if (action === Action.Divide || Action.Exponentiate) {
        expect(result).toBeCloseTo(expected);
      } else {
        expect(result).toBe(expected);
      }
    },
  );
});
test('should return null for invalid action', () => {
  const result = simpleCalculator({ a: 2, b: 3, action: 'invalid_action' });
  expect(result).toBeNull();
});
test('should return null for invalid argument', () => {
  const result = simpleCalculator({ a: '2', b: 3, action: Action.Add });
  expect(result).toBeNull();
});
