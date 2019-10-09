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
module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './',
        // development => '/dist'
        devtoolModuleFilenameTemplate: info =>
            'file://' +
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    devServer: {
        contentBase: './dist',
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TenserPlugin()]
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
                            // -> development 'dist'
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'theme/fonts/[name].[ext]',
                            publicPath: '../',
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
                            outputPath: 'dist/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        // new CopyPlugin([
        //     {
        //         from: './src/theme/assets/icons',
        //         to: 'theme/icons',
        //     },
        // ]),
    ],
};
