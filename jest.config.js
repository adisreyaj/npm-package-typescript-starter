module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/test/**/*.test.(ts)'],
  testEnvironment: 'node',
  coverageReporters: ['lcov'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
};
