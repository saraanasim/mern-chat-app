import express from 'express';
import { createChat, getAllGroups, getExistingChat } from '../controllers/chatControllers';
import { Auth } from '../middleware/user';
const router = express.Router();

router.get('/groups', Auth, getAllGroups);
router.post('/existing', Auth, getExistingChat);
router.post('/', Auth, createChat);

export default router;
