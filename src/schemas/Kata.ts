import { Schema, Document, Model, model } from 'mongoose';

export interface Kata extends Document {

    /** */
    //_id?: string;

    /** */
    name: string;

    /** */
    description: string;

    /** */
    examples: Array<string>;

    /** */
    inputs: Array<{parameter: string, description: string, type: string, constraints: Array<string>}>;

    /** */
    outputs: Array<{description: string, type: string, constraints: Array<string>}>;

    /** */
    initialBodyFunction: string;

    /** */
    enabled: boolean;

}

export let KataSchema = new Schema({
    name:                   { type: String, required: true },
    description:            { type: String, required: true },
    examples:               [{ type: String, required: true }],
    inputs:                 [
                                { parameter: { type: String, required: false } },
                                { description: { type: String, required: false } },
                                { type: { type: String, required: false } },
                                { constraints: [{ type: String, required: false }] },
    ],
    outputs:                [
                                { description: { type: String, required: false } },
                                { type: { type: String, required: false } },
                                { constraints: [{ type: String, required: false }] },
    ],
    initialBodyFunction:    { type: String, required: true },
    enabled:                { type: Boolean, required: true }
});

export const KataModel: Model<Kata> = model<Kata>('katas', KataSchema);