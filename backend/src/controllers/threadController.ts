import { RequestHandler } from "express";
import { Thread, ThreadModel } from "../models/models";

const user = 'me';

// GET api/threads
export const getThreads: RequestHandler = async (req, res, next) => {
    try {
        const threads = await ThreadModel.find().exec();
        res.status(200).json(threads);
    } catch (error) {
        next(error);
    }
}

// POST api/threads 
export const createThread: RequestHandler = async (req, res, next) => {
    const { name, topic }: Thread = req.body;

    try {
        const newThread = await ThreadModel.create({
            name: name,
            topic: topic,
            author: user
        });
        res.status(201).json(newThread);
    } catch (error) {
        next(error);
    }
}

// DELETE api/threads/:
// export const deleteThread: RequestHandler = async (req, res, next) => {
//     const {  } = req.params;
    
//     try {
//         const newThread = await ThreadModel.deleteOne({
//             _id: id,
//         });
//         res.status(201).json(newThread)
//     } catch (error) {
//         next(error);
//     }
// }