import { Schema, Document, Model, model } from 'mongoose';

export interface Challenge extends Document {

    challengeId: string;
    direction: string;
    duration: number;
    mode: string;
    event: string;
    creator: string;
    playerA: string;
    namePlayerA: string;
    playerB: string;
    namePlayerB: string;
    timestamp: Date;
    status: 'WAITING', 'PLAYING', 'ENDED';
    result: string;

}

export let ChallengeSchema = new Schema({
    challengeId:        { type: String, required: true },
    direction:          { type: String, required: true },
    duration:           { type: String, required: true },
    mode:               { type: String, required: true },
    event:              { type: String, required: true },
    creator:            { type: String, required: true },
    playerA:            { type: String, required: true },
    namePlayerA:        { type: String, required: true },
    playerB:            { type: String, required: true },
    namePlayerB:        { type: String, required: true },
    timestamp:          { type: Date, required: true },
    status:             { type: String, required: true },
    result:             { type: String, required: true }
});

export const ChallengeModel: Model<Challenge> = model<Challenge>('challenges', ChallengeSchema);