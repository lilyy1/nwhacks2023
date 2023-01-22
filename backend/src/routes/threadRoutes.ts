import express from "express";
import * as ThreadController from "../controllers/threadController";

const router = express.Router();

router.get("/", ThreadController.getThreads);

router.post("/", ThreadController.createThread);

router.delete("/", ThreadController.deleteThread);

export default router;