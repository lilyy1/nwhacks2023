import { InferSchemaType, Document, Model, model, Schema } from "mongoose";
import { getMessage } from "../controllers/messageController";
import twilioClient from "../twilio/twilio";

const plantSchema = new Schema({
    name: {type: String, required:true},
    plant: {type: String, required: true},
    type: {type: String, required: true},
    water: {type: String, required: false},
});

const threadSchema = new Schema({
    name: {type: String, required:true},
    author: {type: String, required: true},
    topic: {type: String, required: true},
}, {timestamps: true});

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, select: false,},
    password: {type: String, required: true, select: false},
    phoneNumber: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

interface IAppointment extends Document {
    plantName: string;
    escalation: string;
    phoneNumber: string;
    notification: string;
}

interface AppointmentModel extends Model<IAppointment> {
    sendNotifications: (callback: () => void) => void;
}

const AppointmentSchema = new Schema<IAppointment>({
    plantName: {type: String, required: true},
    escalation: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    notification: {type: String, required: true},
});

AppointmentSchema.statics.sendNotifications = function sendNotifications(callback) {
    const searchDate = new Date();
    AppointmentModel
        .find()
        .then((appointments) => {
            appointments = appointments.filter((appointment) => {
                const notificationDate = new Date(appointment.notification);
                return notificationDate.getTime() <= searchDate.getTime();
            });
            if (appointments.length > 0) {
                sendNotifications(appointments);
            }
        });

    function sendNotifications(appointments: IAppointment[]) {
        appointments.forEach((appointment) => {
            const options = {
                to: `+ ${appointment.phoneNumber}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                /* eslint-disable max-len */
                body: getMessage(appointment.escalation, appointment.plantName),
                /* eslint-enable max-len */
            };
            twilioClient.messages.create(options, function(err, _) {
                if (err) {
                    console.error(err);
                } else {
                    let masked = appointment.phoneNumber.substr(0,
                        appointment.phoneNumber.length - 5);
                    masked += '*****';
                    console.log(`Message sent to ${masked}`);
                    AppointmentModel.deleteOne({_id: appointment._id})
                        .then(() => console.log(`Deleted ${appointment._id}`));
                }
            });
        });

        if (callback) {
            callback.call();
        }
    }
};

export type Plant = InferSchemaType<typeof plantSchema>;
export type Thread = InferSchemaType<typeof threadSchema>;
export type User = InferSchemaType<typeof userSchema>;


export const PlantModel = model<Plant>("Plant", plantSchema);
export const ThreadModel = model<Thread>("Thread", threadSchema);
export const UserModel = model<User>("User", userSchema);
export const AppointmentModel = model<IAppointment, AppointmentModel>("Appointment", AppointmentSchema);
