const path = require("path");


// Loaders
const NodeLoader = {
    test: /\.node$/,
    loader: "node-loader"
}
const TypeScriptLoader = {
    test: /\.ts$/,
    loader: "ts-loader"
}



// Server
const Server = {
    target: "node",
    entry: "./src/server/index.ts",
    output: {
        path: path.resolve(__dirname, "../dist"),
    },
    module: {
        rules: [NodeLoader, TypeScriptLoader]  
    },
    resolve: {
        modules: ["node_modules", path.resolve("node_modules")],
        extensions: [".ts", ".js", ".json"]
    }
};


module.exports = Server;