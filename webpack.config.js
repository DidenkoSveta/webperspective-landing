const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // publicPath: '/',
  },
  resolve: {
    extensions: ['.js'], // Указывает webpack расширения файлов для обработки
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
      // Изменённое правило для обработки изображений
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            const relativePath = path.relative(path.resolve(__dirname, 'src'), pathData.filename);
            return `images/${relativePath.replace(/\\+/g, '/')}`.replace('images/images/', 'images/');
          },
        },
      },
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
    new MiniCssExtractPlugin({
      filename: '[name].min.css', // Минифицированный CSS
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.min\.css$/i, 
      }),
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
