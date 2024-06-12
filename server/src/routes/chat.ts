import express from 'express';
import {  getAllGroups } from '../controllers/chatControllers';
import { Auth } from '../middleware/user';
const router = express.Router();

router.get('/groups', Auth, getAllGroups);

export default router;
