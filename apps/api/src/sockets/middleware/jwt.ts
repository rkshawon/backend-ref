// import jwt from "jsonwebtoken";

function SocketAuth(socket: any, next: any) {
  if (socket.handshake.query && socket.handshake.query.token) {
    console.log(socket.handshake.query);
    next
  } else {
    next(new Error("Authentication error"));
  }
}

export default SocketAuth;
