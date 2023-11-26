import { Server as SocketIO } from "socket.io";

const initializeSocket = (server) => {
  const io = new SocketIO(server);
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle events from the client
    socket.on("chat message", (msg) => {
      console.log(`Message: ${msg}`);
      // Broadcast the message to all connected clients
      io.emit("chat message", msg);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default initializeSocket;
