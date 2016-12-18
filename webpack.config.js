var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: __dirname + "/react/src/Main.js",
    output: {
        path: __dirname + "/react/dist",
        filename: "App.js"
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query:{
                presets: ['es2015', 'react']
            }
        }]
    },   
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
    ]
};