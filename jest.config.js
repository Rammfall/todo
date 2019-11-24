module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['\\\\node_modules\\\\', './client'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
};
