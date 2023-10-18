"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
// Retriving port 
const PORT = process.env.SERVER_PORT || "8000";
app_1.default.set("port", PORT);
// Creating HTTP serever 
const server = http_1.default.createServer(app_1.default);
// Listen on port & network insterfcace;
server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// HTTP server event Listenr
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log(`Server listening on http://localhost:${addr.port}`);
}
