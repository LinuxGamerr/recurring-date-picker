// eslint-disable-next-line import/no-anonymous-default-export
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/test/**/*.ts?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
}
