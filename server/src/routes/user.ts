import express from 'express';
import { getAllUsers, getUserById, login, logout, register, updateInfo, validUser } from '../controllers/user';
import { Auth } from '../middleware/user';

const router = express.Router();
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/valid', Auth, validUser);
router.get('/auth/logout', Auth, logout);
router.get('/api/users/all', Auth, getAllUsers);
router.get('/api/users/:id', Auth, getUserById);
router.patch('/api/users/update/:id', Auth, updateInfo);
export default router;
