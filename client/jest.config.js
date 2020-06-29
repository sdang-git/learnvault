module.exports = {
  moduleNameMapper: { '\\.(css|less|scss|sass|css?raw)$': 'identity-obj-proxy' },
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
};
