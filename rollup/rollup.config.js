import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  // output: {
  //   file: 'lib/index.js',
  //   format: 'iife',
  // },
  // 代码拆分
  output: {
    dir: 'lib',
    format: 'amd',
  },
  plugins: [json(), resolve(), commonjs()],
}
