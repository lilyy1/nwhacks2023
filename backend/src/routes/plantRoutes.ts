import express from "express";
import * as PlantsController from "../controllers/plantController";

const router = express.Router();

router.get("/", PlantsController.getPlants);

router.post("/", PlantsController.createPlant);

export default router;