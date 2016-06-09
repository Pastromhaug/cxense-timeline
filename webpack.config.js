/**
 * Created by perandre on 2/23/16.
 */

module.exports = {
    entry: {
        javascript: "./src/index.js",
        html: "./src/index.html"
    },
    output: {
        path: "./dist",
        filename: "./bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader"]
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};