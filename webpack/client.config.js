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
const JSLoader = {
    test: /\.js$/,
    use: [
        "babel-loader"
    ]
}



// Client Options
const partialsEjs = {
    partsHome: "<%- include('parts/menu') %>",
    partsCarrito: "<%- include('parts/carrito') %>",
    partsLoader: "<%- include('parts/loader')  %>",
};


// Client
const Client = [
    {
        entry: {
            carrito: "./src/client/carrito.js",
            login: "./src/client/login.js",
            menu: "./src/client/menu.js",
            payment: "./src/client/payment.js",
            product: "./src/client/product.js"
        },
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, "../dist"),
            filename: "public/js/[name].js"
        },
        module: {
            rules: [        
                FileLoader,
                CSSLoader,
                HTMLLoader,
                JSLoader
            ]
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: "src/client/views/home.ejs",
                filename: "views/home.ejs",
                templateParameters: partialsEjs,
                inject: false
            }),
            new HTMLWebpackPlugin({
                template: "src/client/views/product.ejs",
                filename: "views/product.ejs",
                templateParameters: {
                    clasification: "<%= clasification %>",
                    ...partialsEjs
                },
                inject: false
            }),
            new HTMLWebpackPlugin({
                template: "src/client/views/login.ejs",
                filename: "views/login.ejs",
                templateParameters: {
                    login: "<%= login %>",
                    ...partialsEjs
                },
                inject: false
            }),
            new HTMLWebpackPlugin({
                template: "src/client/views/payment.ejs",
                filename: "views/payment.ejs",
                templateParameters: {
                    ...partialsEjs
                },
                inject: false
            }),
            new HTMLWebpackPlugin({
                template: "src/client/views/about.ejs",
                filename: "views/about.ejs",
                templateParameters: {
                    ...partialsEjs
                },
                inject: false
            }),
            new HTMLWebpackPlugin({
                template: "src/client/views/product-form.ejs",
                filename: "views/product-form.ejs",
                templateParameters: {
                    ...partialsEjs
                },
                inject: false
            }),
        ]
    }
]


module.exports = Client;