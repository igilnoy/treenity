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
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  setupFilesAfterEnv: ['<rootDir>test/setupTests.js'],
});
