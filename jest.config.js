process.env.dbName = process.env.dbName || 'todo_test';
process.env.environment = process.env.environment || 'test';

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  setupFiles: ['./src/config/testEnv.ts']
};
