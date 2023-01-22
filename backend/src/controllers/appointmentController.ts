import { RequestHandler } from "express";
import { AppointmentModel } from "../models/models";
import twilioClient from "../twilio/twilio";
import moment from "moment";

export const getAppointments: RequestHandler = async (req, res, next) => {
    try {        
        const appointments = await AppointmentModel.find().exec();
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
}

export const sendPlantAppointment: RequestHandler = async (req, res, next) => {
    const { plantName, phoneNumber, notification} = req.body;
    try {
        const appointment = await AppointmentModel.create({
            plantName: plantName,
            phoneNumber: phoneNumber,
            notification: notification,
        });
                res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
}