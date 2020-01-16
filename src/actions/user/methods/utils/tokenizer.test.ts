import tokenizer from './tokenizer';

describe('Tokenizer must return both words with space between him', () => {
  const cases = [['string', 'string', 'string string']];

  test.each(cases)('%s with %s will be %s', (first, second, result) => {
    expect(tokenizer(first, second)).toEqual(result);
  });
});
