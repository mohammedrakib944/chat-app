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

  // get user
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    // add new user and send all users to client
    socket.on("add:user", (userId) => {
      addUser(userId, socket.id);
      io.emit("get:users", users);
    });

    // send and get message
    socket.on("send:message", ({ senderId, receiverUsername, text, file }) => {
      // for socket_id
      const receiver = getUser(receiverUsername);
      if (receiver) {
        io.to(receiver.socketId).emit("get:message", {
          senderId,
          text,
          file,
        });
      }
    });

    // remove disconnected user
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("get:users", users);
    });
  });
};

export default initializeSocket;
