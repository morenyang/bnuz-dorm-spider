/**
 * Created by MorenYang on 2017/9/13.
 */

import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import {minify} from 'uglify-es';

const plugins = [
  resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  }),
  babel(),
]
if (process.env.NODE_ENV === 'production') plugins.push(uglify({}, minify))

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
