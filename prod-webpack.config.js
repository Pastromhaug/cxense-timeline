/**
 * Created by perandre on 27.06.16.
 */

module.exports = {
    entry: {
        javascript: "./src/index.js",
        html: "./src/prod-index.html"
    },
    output: {
        path: "./prod/",
        filename: "bundle.js"
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
    },
    node: {
        fs: 'empty'
    },
    externals: [
        {
            './cptable': 'var cptable'
        }
    ]
};