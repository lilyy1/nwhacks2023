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

export const getPlant: RequestHandler = async (req, res, next) => {
    const plantName = req.params.plantName;
    try {
        const plant = await PlantModel.findById(plantName).exec();
        res.status(200).json(plant);
    } catch (error) {
        next(error)
    }
}

export const deletePlant: RequestHandler = async (req, res, next) => {
    const plantName = req.params.plantName;
    try {
        const plant = await PlantModel.deleteOne({ 
            name: plantName});
        res.status(200).json(plant);
    } catch (error) {
        next(error)
    }
}

export const createPlant: RequestHandler = async (req, res, next) => {
<<<<<<< HEAD
    const { name, plant, type, water } = req.body;
=======
    const { name, plant, type, water} = req.body;
>>>>>>> 8848f13 (added user creation)
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