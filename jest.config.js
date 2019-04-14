module.exports = {
  verbose: true,
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Adding this line solved the issue
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  globals: {
    'ts-jest': {
      // ...
      diagnostics: {
        ignoreCodes: [151001]
      }
    }
  }
}