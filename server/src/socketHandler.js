import { Server as SocketIO } from "socket.io";

const initializeSocket = (server) => {
  const io = new SocketIO(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connection", (socket) => {
    console.log("a user is connected.");
    io.emit("welcome", "Hello and welcome to the chat!");
  });
};

export default initializeSocket;
