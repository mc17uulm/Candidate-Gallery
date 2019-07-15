const {resolve} = require('path');

module.exports = {
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
        filename: "CandidateGallery.js",
        path: resolve(__dirname, "wordpress/wp-content/plugins/CandidateGallery/dist/")
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".less"]
    }
};