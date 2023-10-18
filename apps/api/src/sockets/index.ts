function Socket(io: any) {
  io.on("connection", (socket: any) => {
    console.log("Socket id", socket.id);

    socket.on("recieve-message", (message: any, room: any) => {
      socket.join(room);
      socket.to(room).emit("send-message", message);
    });
  });
}

export default Socket;
