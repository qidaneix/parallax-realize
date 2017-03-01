const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: '[name].[hash].css',
});

//dir path
const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, 'src');
const buildPath = path.resolve(rootPath, 'build');


const config = {
    entry: {
        index: path.resolve(srcPath, 'index.js'),
        vendors: ['jquery']
    },

    output: {
        path: buildPath,
        filename: '[name].[hash].js'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                }),
                include: [srcPath]
            }, {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: [
                    {loader: 'url-loader'}
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        }
                    }
                ],
                include: [srcPath]
            }
        ]
    },

    devtool: 'source-map',

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },

    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            title: 'parallax-realize',
            template: path.resolve(srcPath, 'index.html'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['index', 'vendors'],
            //要把script插入到标签里
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: '[name].[hash].js'
        })
    ]
};

 module.exports = config;
