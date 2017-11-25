const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
})

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: __dirname + "/dist",
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + "/src/",
        inline: true,
        host: '127.0.0.1',
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "eslint-loader",
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        extractPlugin,
        // new webpack.optimize.UglifyJsPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8080,
            server: {baseDir: ['dist']}
        }),
        new CopyWebpackPlugin([
            {
                context: 'src',
                from: '*.html',
                to: './'
            },
            {
                context: 'src',
                from: 'img/*',
                to: './'
            }
        ]),
        new StyleLintPlugin({})
    ]
}