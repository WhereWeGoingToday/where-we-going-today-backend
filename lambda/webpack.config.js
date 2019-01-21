const path = require('path');

const config = {
    mode: "development",
    devtool: "source-map",
    target: "node",
    entry: {
        searchRestaurants: './src/searchRestaurants.ts'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.(ts)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ]
    }
};

module.exports = config;