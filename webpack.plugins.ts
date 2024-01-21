import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Dotenv = require('dotenv-webpack')

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new Dotenv({
    path:
      process.env.NODE_ENV === 'production'
        ? './.env.production'
        : './.env.development',
  }),
]
