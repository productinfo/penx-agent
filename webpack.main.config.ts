import type { Configuration } from 'webpack'

import { resolve } from 'path'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyWebpackPlugin = require('copy-webpack-plugin')

import { rules } from './webpack.rules'
import { plugins } from './webpack.plugins'

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    ...plugins,

    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, 'src', 'assets'),
          to: resolve(__dirname, '.webpack', 'main', 'assets'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
}
