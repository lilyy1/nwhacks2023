import { RequestHandler } from "express";
import PlantModel from "../models/plant";

export const getPlants: RequestHandler = async (req, res, next) => {
    try {
        const plants = await PlantModel.find().exec();
        res.status(200).json(plants);
    } catch (error) {
        next(error);
    }
}

export const createPlant: RequestHandler = async (req, res, next) => {
    const name = req.body.name;
    const plant = req.body.plant;
    const type = req.body.type;
    const water = req.body.water;
    try {
        const newPlant = await PlantModel.create({
            name: name,
            plant: plant,
            type: type,
            water: water,
        });
        res.send(201).json(newPlant)
    } catch (error) {
        next(error);
    }
}