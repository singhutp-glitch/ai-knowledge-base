import express from 'express'
const router = express.Router();
import controller from '../controllers/chatController.js'
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/',authMiddleware, controller.loadChatsGet);
router.post('/',authMiddleware,controller.createChatPost);

router.get('/:chatId/messages',authMiddleware, controller.loadMessagesGet);
router.post('/:chatId/messages', authMiddleware,controller.sendMessage);


export default router;