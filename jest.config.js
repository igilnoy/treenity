const { defaults } = require('jest-config');

module.exports = Object.assign(defaults, {
  displayName: {
    name: 'TREENITY',
    color: 'green',
  },
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'test/coverage',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  setupFilesAfterEnv: ['<rootDir>test/setupTests.js'],
});
