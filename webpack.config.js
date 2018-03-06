const path = require('path');
const webpack = require('webpack');
const BrowserSync = require('browser-sync-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const CopyWebpack = require('copy-webpack-plugin');
const StyleLint = require('stylelint-webpack-plugin');
// const uglifyJs = require('uglifyjs-webpck-plugin');

const extractText = new ExtractText({
    filename: 'main.css'
});

module.exports = {
    entry: ['babel-polyfill','./src/js/app.js'],
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname + "./src"),
        // inline: true,
        host: '127.0.0.1',
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader'
                    },
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['env', 'stage-0']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractText.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }, 
            {
                test: /.(png|woff(2)?|eot|ttf|svg)([0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        extractText,
        /* new UglifyJsPlugin({
            test: /\.js$/
        }),*/
        new BrowserSync({
            host: '127.0.0.1',
            port: 8080,
            server: {baseDir: ['dist']}
        }),
        new CopyWebpack([
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
        new StyleLint({
            configFile: '.stylelintrc'
        })
    ]
}