const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        oneOf: [
          {
            test: /\.svg$/,
            include: [path.resolve(__dirname, 'src/icons')],
            use: [
              {
                loader: 'svg-sprite-loader',
                options: {
                  extract: true,
                  publicPath: '/'
                }
              },
              'svgo-loader',
            ]
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            exclude: [path.resolve(__dirname, 'src/icons')],
            type: 'asset/resource',
            generator: {
              filename: 'images/[name][ext][query]',
            },
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[name][ext][query]',
            },
          },
        ]
      },
      // ... (другие правила)
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pug/pages/index.pug',
      filename: 'index.html',
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/privacy.pug',
      filename: 'privacy.html',
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    watchFiles: ['src/**/*.pug', 'src/**/*.scss', 'src/**/*.js'],
  },
  mode: 'development', // Используйте 'production' для минификации ресурсов
};
