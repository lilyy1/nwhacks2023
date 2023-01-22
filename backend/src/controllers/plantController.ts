import { RequestHandler } from "express";
import { PlantModel } from "../models/models";

export const getPlants: RequestHandler = async (req, res, next) => {
    try {        
        const plants = await PlantModel.find().exec();
        res.status(200).json(plants);
    } catch (error) {
        next(error);
    }
}

export const createPlant: RequestHandler = async (req, res, next) => {
    const { name, plant, type, water } = req.body;
    try {
        const newPlant = await PlantModel.create({
            name: name,
            plant: plant,
            type: type,
            water: water,
        });
        res.status(201).json(newPlant)
    } catch (error) {
        next(error);
    }
}