import { InferSchemaType, model, Schema } from "mongoose";

const plantSchema = new Schema({
    name: {type: String, required:true, unique: true},
    plant: {type: String, required: true},
    type: {type: String, required: true},
    water: {type: String, required: false},
})

type Plant = InferSchemaType<typeof plantSchema>;

export default model<Plant>("Plant", plantSchema);