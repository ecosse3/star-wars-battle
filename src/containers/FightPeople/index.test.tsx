import { calculateWinner } from '.';
import { mockPlayer1, mockPlayer2, mockPlayer5 } from './index.mock';

test('a string type of mass to be converted to number', () => {
  // MockPlayer1 Mass: '84'
  // MockPlayer2 Mass: '180'
  const winner = calculateWinner(mockPlayer1, mockPlayer2);
  expect(winner).toMatchObject(mockPlayer1);
});

test('a player with more mass should be a winner', () => {
  // MockPlayer1 Mass: '84'
  // MockPlayer2 Mass: '180'
  const winner = calculateWinner(mockPlayer1, mockPlayer2);
  expect(winner).toMatchObject(mockPlayer1);
});

test('a player with unknown mass should lose', () => {
  // MockPlayer1 Mass: '84'
  // MockPlayer3 Mass: 'unknown'
  const winner = calculateWinner(mockPlayer1, mockPlayer2);
  expect(winner).not.toMatchObject(mockPlayer2);
});

test('a tie when players have same mass', () => {
  // MockPlayer1 Mass: '84'
  // MockPlayer5 Mass: '84'
  const result = calculateWinner(mockPlayer1, mockPlayer5);
  expect(result).toBe('TIE');
});
