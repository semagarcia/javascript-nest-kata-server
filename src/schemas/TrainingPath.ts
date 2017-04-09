import { Schema, Document, Model, model } from 'mongoose';
import { Kata } from './Kata';

export interface TrainingPath extends Document {

    /** */
    topic: string;

    /** */
    name: string;

    /** */
    description: string;

    /** */
    katas: Array<Kata>;

    /** */
    enabled: boolean;

}

export let TrainingPathSchema = new Schema({
    topic:          { type: String, required: true },
    name:             { type: String, required: true },
    description:    { type: String, required: true },
    katas:          [{ type: Schema.Types.ObjectId, required: false, ref: 'katas' }],
    enabled:        { type: Boolean, required: true, default: true }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export const TrainingPathModel: Model<TrainingPath> = model<TrainingPath>('training-paths', TrainingPathSchema);