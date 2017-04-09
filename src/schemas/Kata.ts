import { Schema, Document, Model, model } from 'mongoose';

export interface Kata extends Document {

    /** */
    name: string;

    /** */
    description: string;

    /** */
    examples: Array<string>;

    /** */
    initialBodyFunction: string;

    /** */
    rawkata: {
        /** */
        packageJson: string;

        /** */
        readme: string;

        /** */
        tests: string;

        /** */
        hiddenTests: string;
    };

    /** */
    enabled: boolean;

}

export let KataSchema = new Schema({
    name:                   { type: String, required: true },
    description:            { type: String, required: true },
    examples:               [{ type: String, required: true }],
    initialBodyFunction:    { type: String, required: true },
    rawkata: {
        packageJson:        { type: String, required: true },
        readme:             { type: String, required: true },
        tests:              { type: String, required: true },
        hiddenTests:        { type: String, required: true }
    },
    enabled:                { type: Boolean, required: true }
});

export const KataModel: Model<Kata> = model<Kata>('katas', KataSchema);