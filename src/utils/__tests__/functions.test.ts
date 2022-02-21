import { calculateHigherAttribute } from '#utils/functions';
import {
  mockPeople1,
  mockPeople2,
  mockPeople3,
  mockPeople5
} from '#utils/__mocks__/people.mock';

test('higher mass to be returned', () => {
  // MockPeople1 Mass: '84'
  // MockPeople3 Mass: '112'
  const mass = calculateHigherAttribute(mockPeople1.mass, mockPeople3.mass);
  expect(mass).toBe('112');
});

test('mass with number should be returned when one of mass is unknown', () => {
  // MockPeople1 Mass: '84'
  // MockPeople2 Mass: 'unknown'
  const mass = calculateHigherAttribute(mockPeople1.mass, mockPeople2.mass);
  expect(mass).toBe('84');
});

test('returns -1 when masses are same', () => {
  // MockPeople1 Mass: '84'
  // MockPeople5 Mass: '84'
  const result = calculateHigherAttribute(mockPeople1.mass, mockPeople5.mass);
  expect(result).toBe(-1);
});

test('when two player mass are unknown expect a tie', () => {
  // MockPeople2 Mass: 'unknown'
  // MockPeople2 Mass: 'unknown'
  const mass = calculateHigherAttribute(mockPeople2.mass, mockPeople2.mass);
  expect(mass).toBe(-1);
});
