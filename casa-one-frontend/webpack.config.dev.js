const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
    'process.env.NODE_ENV' : JSON.stringify('production')
}

module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/index'),
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
           new ExtractTextPlugin('styles.css'),
           new webpack.optimize.UglifyJsPlugin({
           sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
          })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, 
                include: path.join(__dirname, 'src'), 
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /(\.scss)$/, 
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
            {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};