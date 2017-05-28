import { Schema, Document, Model, model } from 'mongoose';

export interface User extends Document {

    /** */
    username: string;

    /** */
    password: string;

    /** */
    name: string;

}

export let UserSchema = new Schema({
    username:            { type: String, required: true },
    password:            { type: String, required: true },
    name:                { type: String, required: true },
});

export const UserModel: Model<User> = model<User>('users', UserSchema);