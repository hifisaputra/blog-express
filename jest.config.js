/**
 *  @type {import('ts-jest/dist/types').InitialOptionsTsJest} 
 **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  testTimeout: 10000,
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};
