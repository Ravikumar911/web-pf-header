const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyPlugin = require('copy-webpack-plugin');

const deps = require('./package.json').dependencies;

module.exports = (_, argv) => ({
  output: {
    publicPath: 'auto',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  devServer: {
    port: 8001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/index.ts' }],
    }),
    new ModuleFederationPlugin({
      name: 'header',
      filename: 'header-remote.js',
      remotes: {
        'host-remote': 'host@http://localhost:8080/host-remote.js',
        'header-remote': 'header@http://localhost:8001/header-remote.js',
      },
      exposes: {
        './Nav': './src/components/Header',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        ...deps,
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
});
