import trim from './trim';

describe('Trim string in both sides', () => {
  const data: string[][] = [
    ['test  ', 'test'],
    ['  test', 'test'],
    ['  test  ', 'test']
  ];

  test.each(data)('Trim %s have result %s', (str, result) => {
    expect(trim(str)).toEqual(result);
  });
});
