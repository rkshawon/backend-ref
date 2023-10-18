import "./config/loadenv.config";
import CannabisConnector from "./app";
import http from "http";
import Socket from "./sockets";

import { Server } from "socket.io";

// Retriving port
const PORT: string = process.env.SERVER_PORT || "8000";
const Cannabis = new CannabisConnector();

// Creating HTTP serever
const server = http.createServer(Cannabis.app);
const io = new Server(server, {
  /* options */
  cors: {
    origin: "http://localhost:3000",
  },
});
Socket(io);

// Listen on port & network insterfcace;
server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);

/*
 * @throws {Error}
 */

interface ServerError {
  code: string;
  syscall: string;
}

function onError(error: ServerError) {
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
  var addr: any = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`Server listening on http://localhost:${addr.port}`);
}

export = { io };
