import express from "express";
const router = express.Router();

import { getMessages, sendMessage } from "../controllers/message.controller";
import { Auth } from "../middleware/user";

router.post("/get-messages", Auth, getMessages);
router.post("/", Auth, sendMessage);
export default router;
