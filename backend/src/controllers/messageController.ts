import { RequestHandler } from "express";
import twilioClient from "../twilio/twilio";

export function getMessage(escalation: string, plantName: string): string {
    let message: string;
    switch (escalation) {
        case "0":
            message = `Hi, its ${plantName}! I am ready to be planted!`;
            break;
        case "1":
            message = `Hi! I noticed that you didn't have time to water me today. I'm just reminding you again to water me sometime!`; 
            break;
        case "2":
            message = `Hey, you still haven't watered me yet! I'm getting thirsty!`;
            break;
        case "3":
            message = `Hello, are you there? I'm still waiting for you to water me!`;
            break;
        case "4":
            message = `Hello, ${plantName} is ready for water. 🙂`;
            break;
        case "5":
            message = `I get that you are busy to water me, but I don't blame you. It was nice to live a bit in this world...`;
            break;
        default:
            return "ERROR: CANNOT FIND MESSAGE";
    }
    return `${plantName}: ${message}`;
}

export const getMessages: RequestHandler = async (req, res, next) => {
    try {        
        twilioClient.messages.list()
            .then(messages => {
                res.status(200).json({ messages });
            })
    } catch (error) {
        next(error);
    }
}

export const sendPlantReminderMessage: RequestHandler = async (req, res, next) => {
    const { to, stage } = req.body;
    const { plantName } = req.params;
    try {
        const message = getMessage(stage, plantName);
        twilioClient.messages.create({
            body: message,
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER
        }).then(message => {
            console.log('Message sent: ' + message.sid);
            res.status(201).json(message);
        });
    } catch (error) {
        next(error);
    }
}