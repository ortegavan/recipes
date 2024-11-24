import { FirstLetterPipe } from './first-letter.pipe';

describe('FirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
