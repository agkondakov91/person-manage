const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'), // Папка, из которой будет обслуживаться содержимое
        },
        compress: true, // Сжатие
        port: 9000, // Порт для локального сервера
        open: true // Автоматически открывать страницу браузера при запуске сервера
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // Путь к вашему HTML файлу
        })
    ]
}; 