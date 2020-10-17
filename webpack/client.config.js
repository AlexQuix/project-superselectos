const path = require("path");


// Plugins
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");



// LOADERS
const CSSLoader = {
    test: /\.(s)?css$/,
    use: [
        {
            loader: "file-loader",
            options: {
                name: 'public/[folder]/[name].css',
            }
        },
        "extract-loader",
        "css-loader",
        "sass-loader"
    ]
};
const HTMLLoader = {
    test: /\.html$/,
    use: [
        {
            loader: "file-loader",
            options: {
                name: "views/parts/[name].ejs",
                esModule: false
            }
        },
        "extract-loader",
        {
            loader: "html-loader",
            options: {
                minimize: true,
                esModule: false
            }
        }
    ]

};
const FileLoader = {
    test: /\.(jpg|png|jpeg)$/,
    use: [
        {
            loader: "file-loader",
            options: {
                name: 'public/img/[name].[ext]',
            }
        }
    ]
};



// Client
const partialsEjs = {
    partsHome: "<%- include('parts/menu') %>",
    partsCarrito: "<%- include('parts/carrito') %>"
}
const clientOptions = {
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../dist"),
        filename: "public/js/[name].js"
    }
}
const Client = [
    {
        entry: "./src/client/home.js",
        ...clientOptions,
        plugins: [
            new HTMLWebpackPlugin({
                template: "src/client/views/home.ejs",
                filename: "views/home.ejs",
                templateParameters: partialsEjs
            })
        ]
    },
    {
        entry: "./src/client/index.js",
        output: {
            path: path.resolve(__dirname, "../dist"),
            filename: "public/js/index.js"
        },
        module: {
            rules: [        
                FileLoader,
                CSSLoader,
                HTMLLoader
            ]
        }
    }
]


module.exports = Client;