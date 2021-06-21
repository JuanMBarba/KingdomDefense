const path = require("path");

module.exports = {
    entry: "./js/main.js",
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env"],
                }
            }
        ]
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", "*"],
    }
}