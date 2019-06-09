var path = require('path')
var webpack = require('webpack')


module.exports = {
  entry: {
    main:'./src/main.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/build/',
    filename: 'wpcf.min.js'
    // filename: '[name].min.js'
  },
  module: {

    rules: [

      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     loaders: {
      //       'scss': 'vue-style-loader!css-loader!sass-loader',
      //       'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
      //     }
      //     // other vue-loader options go here
      //   }
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //     test: /\.scss$/,
      //     use: [
      //       {
      //         loader: "style-loader" // creates style nodes from JS strings 
      //       }, {
      //           loader: "css-loader" // translates CSS into CommonJS 
      //       }, {
      //           loader: "sass-loader" // compiles Sass to CSS 
      //       }
      //     ]
      // },
      {
        test: /\.(png|jpg|gif|svg|woff)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }, 
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js'
  //   }
  // },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

// if (process.env.NODE_ENV === 'development') {
  
// }


if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
