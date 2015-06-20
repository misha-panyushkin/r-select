module.exports = {
	entry: "./src/entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.js/, loader: 'jsx-loader'}
        ]
    }
};