import typescript from 'rollup-plugin-typescript'

module.exports = {
  input: 'src/index.tsx',
  output: {
    dir: 'build',
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [
    typescript(),
  ]
}