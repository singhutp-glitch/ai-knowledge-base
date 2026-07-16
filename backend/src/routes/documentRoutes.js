import express from 'express'
const router = express.Router();
import controller from '../controllers/documentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/chunks/:chunkId',authMiddleware, controller.getChunks);




export default router;