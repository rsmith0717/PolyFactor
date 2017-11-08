var webpack = require('webpack');
var path  = require("path");

module.exports = {
    entry: './public/scripts/src/script.js',
    output: {
        path: path.resolve(__dirname, "public/scripts/dist"),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    }
};