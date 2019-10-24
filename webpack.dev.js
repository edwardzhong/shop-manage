const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // index:'index.html',
        compress:true,
        port: 4001,
        hot: true,
        // historyApiFallback: true
    }
});