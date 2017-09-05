var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: __dirname + "/react/src/Main.js",
    output: {
        path: __dirname + "/react/dist",
        filename: "App.js"
    },
    watch: true,
    resolve: {
        modules: [path.resolve(__dirname, 'react/src'), "node_modules"]
    },    
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:{
                presets: ['es2015', 'react']
            }
        }]
    },   
    plugins:[]
};