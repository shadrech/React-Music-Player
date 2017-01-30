var webpack = require('webpack');

var config = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/js/App.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015','react']
        }
      }
    }, {
      test: /\.scss$/,
      use: ["style-loader","css-loader","autoprefixer-loader","sass-loader"]
    }, {
      test: /\.less$/,
      use: ["style-loader","css-loader","less-loader"]
    }]
  },
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: true
  },
}

/* If bundling for production, optimize output, no sourcemaps */
if (process.env.NODE_ENV === 'production') {
  delete config.devtool;

  config.plugins = [
    //https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
          warnings: true
      }
    })
  ];
};

module.exports = config;
