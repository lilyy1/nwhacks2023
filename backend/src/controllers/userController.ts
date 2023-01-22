import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

interface signUpBody {
    username?: string,
    email?: string,
    password?: string,
    phoneNumber?: string,
    firstName?: string,
    lastName?: string,
}

//TODO: fix error thrown for missing credentials
export const signUp: RequestHandler<unknown, unknown, signUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    try {
        if(!username || !email|| !passwordRaw|| !phoneNumber || !firstName|| !lastName){
            throw createHttpError(400, "Missing credential");
        }
        const existingusername = await UserModel.findOne({ username: username }).exec();
        const existingemail = await UserModel.findOne({ email: email }).exec();
        const existingphonenum = await UserModel.findOne({ phoneNumber: phoneNumber }).exec();
        if(existingusername){
            throw createHttpError(409, "User Name is already taken")
        }
        if(existingemail){
            throw createHttpError(409, "A user exists with that email")
        }
        if(existingphonenum){
            throw createHttpError(409, "A user exists with that phone number")
        }

        const hashedPass = await bcrypt.hash(passwordRaw, 10);

        const createUser = await UserModel.create({
            username: username,
            email: email,
            password: hashedPass,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName
        })

        res.status(201).json(createUser);

    } catch (error) {
        next(error);
    }
}