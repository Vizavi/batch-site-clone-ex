const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production', // или 'development' в зависимости от ваших потребностей
    entry: {
        popup: path.join(__dirname, 'popup.js'),
        background: path.join(__dirname, 'background.js'),
        contentScript: path.join(__dirname, 'contentScript.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // some other rules ?? 
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './manifest.json', to: 'manifest.json' },
                { from: './output.css', to: 'output.css' },
                { from: './icons', to: './icons' },
                //  { from: './contentScript.js', to: 'contentScript.js' },
                //  { from: './background.js', to: 'background.js' },
                //  { from: './popup.js', to: 'popup.js' },
            ],
        }),
    ],
    resolve: {
        extensions: ['.js']
    }
};
