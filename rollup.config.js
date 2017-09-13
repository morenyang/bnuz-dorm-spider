/**
 * Created by MorenYang on 2017/9/13.
 */

import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const plugins = [babel()]
if (process.env.NODE_ENV === 'production') plugins.push(uglify())

export default ({
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  // 当需要作为库被使用时提供该字段
  // moduleName: '',
  plugins
})
