import { InferSchemaType, model, Schema } from "mongoose";

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
    password: {type: String, required: true, select:false},
    phoneNumber: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})


export type Plant = InferSchemaType<typeof plantSchema>;
export type Thread = InferSchemaType<typeof threadSchema>;
export type User = InferSchemaType<typeof userSchema>;


export const PlantModel = model<Plant>("Plant", plantSchema);
export const ThreadModel = model<Thread>("Thread", threadSchema);
export const UserModel = model<User>("User", userSchema);

