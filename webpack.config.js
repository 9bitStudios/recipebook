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
    plugins:[        
        // Note: setting compress: false in UglifyJsPlugin is a temporary fix for an UglifyJs bug... 
        // https://github.com/webpack/webpack/issues/4394
        // https://github.com/mishoo/UglifyJS2/issues/1516
        new webpack.optimize.UglifyJsPlugin({ 
            sourceMap: true,          
            compress: false  
        }),
    ]
};