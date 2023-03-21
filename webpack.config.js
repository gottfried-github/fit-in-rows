import path from 'path'
import { fileURLToPath } from 'url'

import MiniCssExtractPlugin from "mini-css-extract-plugin"

// https://stackoverflow.com/a/50052194
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
    output: {
        path: path.resolve(__dirname, 'demo/dist'),
        filename: '[name].js',
        assetModuleFilename: '[name][ext]'
      },
      entry: {
        index: './demo/src/index.js',
      },
      mode: "development",
      devtool: 'inline-source-map',
      module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.(html)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
      },
      plugins: [
          new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].css",
          // chunkFilename: "[id].css",
        }),
      ]
}