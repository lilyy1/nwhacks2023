import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, select: false,},
    password: {type: String, required: true, select:false},
    phoneNumber: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);