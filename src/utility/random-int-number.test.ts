import {} from '@testing-library/react';
import randomIntNumber from './random-int-number';
describe('test random-init number utility', () => {
  it('expect to not null when give it max', () => {
    expect(randomIntNumber(1000)).not.toBeNull();
  });
  it('expect to be nagitve -1', () => {
    expect(randomIntNumber(-0.1111)).toEqual(-1);
  });
  it('expect to zero', () => {
    expect(randomIntNumber(0.11111)).toEqual(0);
  });
  it('to be not null when function choose max', () => {
    expect(randomIntNumber()).not.toBeNull();
  });
});
