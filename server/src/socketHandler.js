import { Server as SocketIO } from "socket.io";

const initializeSocket = (server) => {
  const io = new SocketIO(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  let users = [];

  // add user
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  // remove user
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  io.on("connection", (socket) => {
    console.log("a user is connected.");

    // add new user and send all users to client
    socket.on("add:user", (userId) => {
      addUser(userId, socket.id);
      io.emit("get:users", users);
    });

    // remove disconnected user
    socket.on("disconnect", () => {
      console.log("a user is disconnected.");
      removeUser(socket.id);
      io.emit("get:users", users);
    });
  });
};

export default initializeSocket;
