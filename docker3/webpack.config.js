'use strict';


const webpack = require('webpack');
var path = require('path');

module.exports = {
    //context: path.resolve(__dirname, "."),
    entry: [
        'webpack-dev-server/client?http://localhost:1234',
        // 'webpack-dev-server/client?:1234',
        'webpack/hot/only-dev-server',
        // 'webpack-dev-server/client?:1234/',
        // 'webpack/hot/dev-server',
        './test.js'
    ],
    output: {
      filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.js', '.styl']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }]
            },
            // {
            //     test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            //     use: {
            //         loader: 'file-loader?name=[path][name].[ext]',
            //     }
            // },
        ]
    },
    watchOptions: {
          poll: true,
          // aggregateTimeout: 1000
    },
    plugins: [
    ],
    devServer: {
        host: '0.0.0.0',
        port: 80,
       // proxy: {
       //     '*': 'http://localhost:80'
       // },
        hot: true,
       // publicPath: '/'
       // proxy: [
       //     {
       //         '*' : 'http://localhost:1234'
       //     }
       // ]
        // contentBase: path.resolve(__dirname, "public"),
    }
};