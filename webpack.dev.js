let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractPlugin = new MiniCssExtractPlugin({
    filename: 'theme/index.css',
    chunkFilename: 'id.css',
});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
        devtoolModuleFilenameTemplate: info =>
            'file://' +
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
    },
    devtool: 'source-map',
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
                            publicPath: path.join(__dirname, 'dist'),
                            // -> development 'dist'
                        },
                    },
                    'css-loader',
                    {
                        loader: 'resolve-url-loader',
                        options: {},
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
                            publicPath: './assets',
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
        extractPlugin,
        new CopyPlugin([
            {
                from: './src/theme/assets',
                to: 'theme/assets',
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
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
};
