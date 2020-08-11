const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'mystyles.css',
    }),
    new HtmlWebpackPlugin({
      title: 'Weather App',
      filename: 'index.html',
      meta: {
        author: 'Ricardo Valtierra',
        'og:image': { property: 'og:image', content: './src/img/preview.png' },
        'linkedin:image': { name: 'linkedin:image', content: './src/img/preview.png' },
        'og:url': { property: 'og:url', content: 'https://weather-query.netlify.app/' },
        'linkedin:card': 'summary',
        'og:description': { property: 'og:description', content: 'Weather App for a global forecast on F° and C°' },
        'og:title': { property: 'og:title', content: 'Weather App' },
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // options...
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};
