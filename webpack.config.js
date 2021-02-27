const {resolve} = require('path');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

let config = {
    module: {}
};

const rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: [
            /node_modules/,
            /dist/,
            /vendor/
        ],
        use: {
            loader: "babel-loader"
        }
    }, {
        test: /\.(ts|tsx)$/,
        exclude: [
            /node_modules/,
            /dist/,
            /vendor/
        ],
        use: {
            loader: "ts-loader"
        }
    }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?-url']
    }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?-url', 'sass-loader']
    }, {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
            loader: 'file-loader?name=/img/[name].[ext]'
        }
    }, {
        test: /\.svg$/,
        use: {
            loader: 'svg-url-loader',
            options: {
                limit: 10000
            }
        }
    }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }
    }
];

const backend = Object.assign({}, config, {
    name: "backend",
    entry: "./components/backend/scripts/index.ts",
    module: {
        rules: rules
    },
    output: {
        filename: 'js/persons_frontend.js',
        path: resolve(__dirname, 'dist/')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
    }
});

const frontend = Object.assign({}, config, {
    name: 'frontend',
    entry: './components/frontend/index.ts',
    module: {
        rules: rules
    },
    output: {
        filename: 'js/persons_backend.js',
        path: resolve(__dirname, 'dist/')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
    }
});

const gutenberg = Object.assign({}, config, {
    name: 'gutenberg',
    entry: './components/gutenberg/index.ts',
    module: {
        rules: rules
    },
    output: {
        filename: 'js/persons_gutenberg.js',
        path: resolve(__dirname, 'dist/')
    },
    plugins: [
        new DependencyExtractionWebpackPlugin({injectPolyfill: true})
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
    }
});

module.exports = [
    backend, gutenberg, frontend
];