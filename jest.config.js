/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: '@trendyol/jest-testcontainers',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      functions: 79,
      lines: 80,
      statements: 80,
    },
  },
  testTimeout: 10000,
  moduleFileExtensions: ['js','json', 'ts',],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/**/*.ts',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**',
    '!dist/**',
    '!jest.config.js',
    '!**/test/**',
    '!test/**',
    '!**/src/db/migrations/**',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  }, 
  // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed
  // In this case indicates that the environment configuration will be executed before each test
  setupFiles: ['<rootDir>/test/env.ts'],
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text', 'text-summary'],
  // The pattern or patterns Jest uses to detect test files
  // By default it looks for .js, .jsx, .ts and .tsx as well as any files with a suffix of .test or .spec
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/coverage/', '/dist/'],
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources,
  // like images or styles with a single module.
  moduleNameMapper: {
    '^service/(.*)': '<rootDir>src/service/$1',
    '^db/(.*)': '<rootDir>src/db/$1',
    '^repository/(.*)': '<rootDir>src/repository/$1',
    '^const/(.*)': '<rootDir>src/const/$1',
    '^bot/(.*)': '<rootDir>src/bot/$1',
    '^scripts/(.*)': '<rootDir>src/scripts/$1',
    '^tasks/(.*)': '<rootDir>src/tasks/$1',
    '^conf/(.*)': '<rootDir>src/conf/$1',
  },
};
