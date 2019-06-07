var path = require('path')
var webpack = require('webpack')
var fs = require('fs')


module.exports = {
  entry: {
    main:'./script/main.js',
  },
  output: {
    path: path.resolve(__dirname, './script/build'),
    publicPath: '/script/build/',
    filename: '[name].min.js'
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
fs.readFile('./functions.php', 'utf8', function(err, data) {
  if (err) {
    return console.log(err)
  }

  var oldPath
    , newPath

  if (process.env.NODE_ENV === 'development') {
    oldPath = "get_stylesheet_directory_uri() . '/script/build/main.min.js'"
    newPath = "'http://127.0.0.1:8080/script/build/main.min.js'"
  } else if (process.env.NODE_ENV === 'production') {
    oldPath = "'http://127.0.0.1:8080/script/build/main.min.js'"
    newPath = "get_stylesheet_directory_uri() . '/script/build/main.min.js'"
  }

  var result = data.replace(oldPath, newPath)
  fs.writeFile('./functions.php', result, 'utf8', function(err) {
    if (err) {
      return console.log(err)
    }
  })
  
})

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
