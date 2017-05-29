import { Schema, Document, Model, model } from 'mongoose';

export interface Event extends Document {

    /** */
    _id: string;

    /** */
    name: string;

    /** */
    description: string;

    /** */
    date: {
        start: Date;
        end?: Date;
    };

    /** */
    urlLoc?: string;

    /** */
    enabled: boolean;

}

export let EventSchema = new Schema({
    name:                   { type: String, required: true },
    description:            { type: String, required: true },
    date:                   { type: {
                                start:  { type: Date, required: true },
                                end:    { type: Date, required: false }
                              }, required: true
                            },
    urlLoc:                 { type: String, required: false },
    localization:           { type: {
        place:                  { type: String, required: true },
        latitude:               { type: String, required: true },
        longitude:              { type: String, required: true }
                              }, required: false
                            },
    enabled:                { type: Boolean, required: true }
});

export const EventModel: Model<Event> = model<Event>('events', EventSchema);