const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

    entry: [
        './src/app/index.js'
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    mode: 'development',
    
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(s(a|c)ss)$/,
                
                use: [
                    // fallback to style-loader in development
                    devMode 
                      ? "style-loader"
                      : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                  ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
                use: {
                  loader: 'url-loader',
                },
            }
        ]
    },

    devServer : {
        port: 4000
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ]

};