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

export type Plant = InferSchemaType<typeof plantSchema>;
export type Thread = InferSchemaType<typeof threadSchema>;

export const PlantModel = model<Plant>("Plant", plantSchema);
export const ThreadModel = model<Thread>("Thread", threadSchema);
