let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractPlugin = new MiniCssExtractPlugin({
    filename: 'theme/index.css',
    chunkFilename: 'id.css',
});
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TenserPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const MinifyPlugin = require('babel-minify-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './',
        devtoolModuleFilenameTemplate: info =>
            'file://' +
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TenserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.join(__dirname, './'),
                        },
                    },
                    'css-loader',
                    {
                        loader: 'resolve-url-loader',
                        options: {}
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './[name].[ext]',
                            output: './assets',
                            publicPath: './assets'
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'theme/assets/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            quality: 85,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {
                from: './src/theme/assets',
                to: 'theme/assets'
            },
            {
                from: './vendor',
                to: 'vendor',
            },
    
            {
                from: './manifest.webmanifest',
                to: './',
            },
        ]),
        extractPlugin,
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
};
