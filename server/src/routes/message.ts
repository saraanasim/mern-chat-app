import express from "express";
const router = express.Router();

import { getMessages, sendMessage } from "../controllers/messageControllers";
import { Auth } from "../middleware/user";

router.post("/", Auth, sendMessage);
router.get("/:chatId", Auth, getMessages);
export default router;
