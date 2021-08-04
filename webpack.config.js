/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable line-comment-position */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const WebpackBar = require('webpackbar');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    mode: 'production',
    entry: './src/main.ts',
    output: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].js',
        publicPath: 'auto',
        path: resolve('output')
    },
    resolve: {
        extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': resolve('src')// 这样配置后 @ 可以指向 src 目录
        }
    },
    stats: 'errors-only', // 项目打包配置终端输出日志
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: 'src/theme/var.scss'
                        }
                    }
                ]
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|jpeg|gif|bmp|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'imgs/[name].[contenthash:7].[ext]',
                        esModule: false
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '../../',
                    name: 'fonts/[name].[contenthash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|ogg|mp3|wav)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'medias/[name].[contenthash:7].[ext]'
                    }
                }
            },
        ]
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 100000,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'all'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'all',
                    reuseExistingChunk: true
                },
                element: {
                    chunks: 'all',
                    name: 'element-plus',
                    test: /[\\/]element-plus[\\/]/,
                    priority: 0,
                },
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(), // 每次打包前先删除output文件夹
        new HtmlWebpackPlugin({ // 将变量注入到html中
            template: './index.html',
            filename: 'index.html',
            title: 'bee-template',
            minify: {
                collapseWhitespace: true, // 去掉空格
                removeComments: true // 去掉注释
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:7].css',

        }),
        new FriendlyErrorsWebpackPlugin(),
        new CopyWebpackPlugin({ // 打包public文件夹下的静态资源
            patterns: [{ from: path.resolve(__dirname, './public'), to: '' }],
        }),
        new CompressionWebpackPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)'),
            threshold: 10240,
            minRatio: 0.8
        }),
        // @ts-ignore
        new WebpackBar()
    ]
};
