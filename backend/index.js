import express from "express";
import { corsMiddleware } from "./src/middleware/cors.js";
import { config } from "./config/env.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import authRoutes from './src/routes/authRoutes.js';
import healthRoutes from './src/routes/healthRoutes.js'
import uploadRoutes from './src/rag/routes/uploadRoutes.js'

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/chats", chatRoutes);
app.use("/auth", authRoutes);
app.use("/rag", uploadRoutes);


const PORT = config.port;

app.listen(PORT, () => {
  console.log("Server running on port "+PORT);
});