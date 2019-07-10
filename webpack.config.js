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
            }
        ]
    },
    output: {
        filename: "add.js",
        path: resolve(__dirname, "wordpress/wp-content/plugins/CandidateGallery/dist/")
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
};