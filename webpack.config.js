const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

    entry: './app.js',

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            {
                // Apply rule for .sass, .scss or .css files
                test: /\.(sa|sc|c)ss$/,

                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // This loader resolves url() and @imports inside CSS
                        loader: "css-loader",
                    },
                    {
                        // Then we apply postCSS fixes like autoprefixer and minifying
                        loader: "postcss-loader",
                        options: {
                            config: {
                              path: __dirname + '/postcss.config.js'
                            }
                          },
                    },
                    {
                        // First we transform SASS to standard CSS
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            }

        ]
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],

    mode: 'development'
};