import express from "express";
import upload from "../upload/multerConfig.js";
import postUploadDocument from "../controllers/uploadController.js";
import { getChunks } from "../controllers/retrievelController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/chats/:chatId/documents", authMiddleware,upload.single('document'),postUploadDocument);
router.post("/chats/:chatId/chunks", authMiddleware,getChunks);




export default router;