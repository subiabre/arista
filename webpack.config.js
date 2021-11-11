const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = {
    mode: 'development',
    entry: {
        client: path.resolve(__dirname, 'src', 'server', 'client', 'index.js'),
        remote: path.resolve(__dirname, 'src', 'server', 'remote', 'index.js'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed)
        })
    ],
};
