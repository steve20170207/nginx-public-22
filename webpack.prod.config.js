const path    = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.js',

    output: {
        path:     path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: [ 'es2015' ],
                plugins: [ 'transform-object-rest-spread' ],
              }
            }
          ],
        }
      ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress:   true,
            mangle:     true,
            comments:   false,
            sourceMap:  false,
        }),
        new webpack.optimize.DedupePlugin(),
        new CopyWebpackPlugin([
            { from: './src/index.html',                                 to: '../dist/index.html' },
            { from: './src/android-chrome-192x192.png',                 to: '../dist/android-chrome-192x192.png' },
            { from: './src/android-chrome-256x256.png',                 to: '../dist/android-chrome-256x256.png' },
            { from: './src/apple-touch-icon.png',                       to: '. ./dist/apple-touch-icon.png' },
            { from: './src/browserconfig.xml',                          to: '../dist/browserconfig.xml' },
            { from: './src/favicon.ico',                                to: '../dist/favicon.ico' },
            { from: './src/favicon-16x16.png',                          to: '../dist/favicon-16x16.png' },
            { from: './src/favicon-32x32.png',                          to: '../dist/favicon-32x32.png' },
            { from: './src/manifest.json',                              to: '../dist/manifest.json' },
            { from: './src/mstile-150x150.png',                         to: '../dist/mstile-150x150.png' },
            { from: './src/safari-pinned-tab.svg',                      to: '../dist/safari-pinned-tab.svg' },
            { from: './src/css',                                        to: '../dist/css' },
            { from: './src/fonts',                                      to: '../dist/fonts' },
            { from: './src/img',                                        to: '../dist/img' },
            { from: './src/lib',                                        to: '../dist/lib' },
            { from: './src/multitenancy',                               to: '../dist/multitenancy' },
            { from: './src/phu',                                        to: '../dist/phu' },

            { context: './src/',    from: '**/*.template.html',     to: '../dist/' },
            { context: './src/',    from: '**/*.css',               to: '../dist/' },
            { context: './src/',    from: '**/*.json',              to: '../dist/' },

            { from: './nginx.conf',  to: '../dist/nginx.conf' }
        ])
    ],
};
