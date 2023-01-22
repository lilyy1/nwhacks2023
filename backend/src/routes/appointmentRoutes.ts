import express from "express";
import * as AppointmentController from "../controllers/appointmentController";

const router = express.Router();

router.get("/", AppointmentController.getAppointments);

router.post("/", AppointmentController.sendPlantAppointment);

export default router;
