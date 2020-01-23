const { defaults } = require('jest-config');

module.exports = Object.assign(defaults, {
  displayName: {
    name: 'TREENITY',
    color: 'green',
  },
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['test/*.js'],
  coverageDirectory: 'test/coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
});
