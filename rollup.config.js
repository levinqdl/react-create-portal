import typescript from "rollup-plugin-typescript"

module.exports = {
  input: "src/index.tsx",
  output: {
    dir: "dist",
    file: "index.js",
    format: "cjs",
  },
  plugins: [typescript()],
  external: ["react", "react-dom"],
}
