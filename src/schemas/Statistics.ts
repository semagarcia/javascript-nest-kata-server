import { Schema, Document, Model, model } from 'mongoose';

export interface KataStats extends Document {

    /* User identifier */
    username: string;

    /* Event (if it applies) */
    event: string;

    stats: [{
        /* The id (title) */
        kata: string;

        /* Current status of the kata */
        status: boolean;
        
        /* Number of attemps */
        attemps: number;

        /* Time spent */
        time: number;
    }];

    /* Total time playing with the platform */
    totalTime: number;

}

export let KataStatsSchema = new Schema({
    username:               { type: String, required: true },
    event:                  { type: String, required: true },
    stats: [{
        kata:               { type: String, required: true },
        status:             { type: Boolean, required: true },
        attemps:            { type: Number, required: true },
        time:               { type: Number, required: true }
    }],
    totalTime:              { type: Number, required: true }
});

export const KataStatsModel: Model<KataStats> = model<KataStats>('statistics', KataStatsSchema);