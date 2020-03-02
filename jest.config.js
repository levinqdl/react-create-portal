module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coverageReporters: ["json-summary"],
  setupFilesAfterEnv: [
    "<rootDir>/jestSetup.ts"
  ],
}
