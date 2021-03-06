// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    // This is our Express server for Dynamic universal
    server: './src/ng-server/server.ts'
  },
  target: 'node',
  resolve: { extensions: ['.ts', '.js'] },
  // Make sure we include all node_modules etc
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, 'dist/ng-server'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src/ng-client'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src/ng-client'),
      {}
    )
  ]
}
