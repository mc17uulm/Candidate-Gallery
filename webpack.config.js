const {resolve} = require('path');

let config = {
    module: {}
};

let backend = Object.assign({}, config, {
    name: "backend",
    entry: "./src/js/backend/",
    module: {
        rules: [
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
                    /vendor/
                ],
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }, {
                test: /\.less$/,
                exclude: [
                    /node_modules/,
                    /dist/,
                    /vendor/
                ],
                use: [
                    {
                        loader: "style-loader",
                    }, {
                        loader: "typings-for-css-modules-loader",
                        options: {
                            modules: true,
                            namesExport: true
                        }
                    },{
                        loader: "less-loader"
                    }
                ]
            }
        ]
    },
    output: {
        filename: "cg_backend.js",
        path: resolve(__dirname, "wordpress/wp-content/plugins/CandidateGallery/dist/")
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".less"]
    }
});

let gutenberg = Object.assign({}, config, {
    name: "gutenberg",
    entry: "./src/js/gutenberg",
    module: {
        rules: [
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
                    /node_modules/
                ],
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
    output: {
        filename: "cg_gutenberg.js",
        path: resolve(__dirname, "wordpress/wp-content/plugins/CandidateGallery/dist/")
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
});

let frontend = Object.assign({}, config, {
    name: "frontend",
    entry: "./src/js/frontend/",
    module: {
        rules: [
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
                    /vendor/
                ],
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }, {
                test: /\.less$/,
                exclude: [
                    /node_modules/,
                    /dist/,
                    /vendor/
                ],
                use: [
                    {
                        loader: "style-loader",
                    }, {
                        loader: "typings-for-css-modules-loader",
                        options: {
                            modules: true,
                            namesExport: true
                        }
                    },{
                        loader: "less-loader"
                    }
                ]
            }
        ]
    },
    output: {
        filename: "cg_frontend.js",
        path: resolve(__dirname, "wordpress/wp-content/plugins/CandidateGallery/dist/")
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".less"]
    }
});

module.exports = [
    backend, gutenberg, frontend
];