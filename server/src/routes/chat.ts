import express from 'express';
import { accessChats, addToGroup, createGroup, fetchAllChats, removeFromGroup, renameGroup } from '../controllers/chatControllers';
import { Auth } from '../middleware/user';
const router = express.Router();


router.post('/', Auth, accessChats);
router.get('/', Auth, fetchAllChats);
router.post('/group', Auth, createGroup);
router.patch('/group/rename', Auth, renameGroup);
router.patch('/groupAdd', Auth, addToGroup);
router.patch('/groupRemove', Auth, removeFromGroup);
router.delete('/removeuser', Auth);

export default router;
