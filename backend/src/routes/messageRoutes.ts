import express from "express";
import * as MessageController from "../controllers/messageController";

const router = express.Router();

router.get("/", MessageController.getMessages);

router.post("/:plantName", MessageController.sendPlantReminderMessage);

export default router;
