'use strict';

const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const {styles} = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
    mode: 'development',
    devServer: {
        allowedHosts: ['ck5-media.app.loc'],
        contentBase: [path.join(__dirname, 'demo'), '/opt'],
        host: '0.0.0.0',
        port: 8080,
        serveIndex: true,
    },
    devtool: 'eval-source-map',
    performance: {hints: false},
    entry: path.resolve(__dirname, 'demo', 'config.js'),
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'ckeditor.js',
        library: 'ClassicEditor',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    output: {
                        // Preserve CKEditor 5 license comments.
                        comments: /^!/
                    }
                },
                extractComments: false
            })
        ]
    },
    plugins: [
        new CKEditorWebpackPlugin({
            language: 'de'
        })
    ],
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['raw-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig({
                            themeImporter: {
                                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                            },
                            minify: true
                        })
                    }
                ]
            }
        ]
    }
};
