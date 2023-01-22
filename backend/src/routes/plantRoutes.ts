import express from "express";
import * as PlantController from "../controllers/plantController";

const router = express.Router();

router.get("/", PlantController.getPlants);

router.get("/:plantName", PlantController.getPlant)

router.delete("/:plantName", PlantController.deletePlant)

router.post("/", PlantController.createPlant);

export default router;
