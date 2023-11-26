import "dotenv/config";
import express from "express";
import conversationRoutes from "./src/routes/conversation.js";
import initializeSocket from "./src/socketHandler.js";
import messageRoutes from "./src/routes/messages.js";
import DB_Connection from "./src/config/database.js";
import cors from "cors";
import http from "http";

const PORT = 8000;
const app = express();
const server = http.createServer(app);

// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// Initialize socket.io
initializeSocket(server);

// ROUTES
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);

//ERROR HANDLER
app.use("/*", (req, res, next) => {
  next("URL not found!");
});

// Server ERROR HANDER
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || err || "Server Error!";
  return res.status(statusCode).json({
    sucess: false,
    message: errorMessage,
  });
});

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}!`);
  await DB_Connection();
});
