import { Schema, Document, Model, model } from 'mongoose';

export interface Challenge extends Document {

    challengeId: string;
    direction: string;
    duration: number;
    mode: string;
    event: string;
    creator: string;
    playerA: string;
    usernamePlayerA?: string;
    playerB?: string;
    usernamePlayerB?: string;
    status: 'WAITING' | 'PLAYING' | 'ENDED' | 'EXPIRED';
    result?: string;

}

export let ChallengeSchema = new Schema({
    challengeId:        { type: String, required: true },
    direction:          { type: String, required: true },
    duration:           { type: String, required: true },
    mode:               { type: String, required: true },
    event:              { type: String, required: false },
    creator:            { type: String, required: true },
    playerA:            { type: String, required: false },
    usernamePlayerA:    { type: String, required: false },
    playerB:            { type: String, required: false },
    usernamePlayerB:    { type: String, required: false },
    status:             { type: String, default: 'WAITING', required: false },
    result:             { type: String, required: false }
}, { timestamps: true });

export const ChallengeModel: Model<Challenge> = model<Challenge>('challenges', ChallengeSchema);