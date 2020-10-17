const Server = require("./server.config");
const Client = require("./client.config");


module.exports = [
    Server,
    ...Client
];