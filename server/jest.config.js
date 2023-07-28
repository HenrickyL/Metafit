module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/app/**/*.test.ts'],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/app/$1",
    "^@modules/(.*)$": "<rootDir>/app/Modules/$1",
    "^@core/(.*)$": "<rootDir>/app/core/$1",
    "^@infra/(.*)$": "<rootDir>/app/infra/$1",
    "^@config/(.*)$": "<rootDir>/config/$1",
    "^types/(.*)$": "<rootDir>/types/$1"

  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFiles: ["<rootDir>/config/jestMock.ts"],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  }
};