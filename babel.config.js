const { compilerOptions } = require('./tsconfig.json');

const { paths } = compilerOptions;

const alias = {}
Object.entries(paths).map(path => {
  alias[path[0].replace('/*', '')] = path[1][0].replace('/*', '')
})

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias
      }
    ]
  ],
  ignore: [
    "**/*.test.ts",
    "**/*.spec.ts",
    "**/@types/**"
  ]
}
