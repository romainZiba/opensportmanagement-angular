module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
  transformIgnorePatterns: ['node_modules/(?!(ngx-cookie-service)/)'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
