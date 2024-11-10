import mongoose from 'mongoose';
import { TUser } from './User';

export enum ERpeat {
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly',
    DOES_NOT_REPEAT = 'Does not repeat',
}

export type TNote = {
    _id: mongoose.Types.ObjectId;
    title: string;
    body: string;
    list: TTask[];
    imgs: TImage[];
    reminder: {
        datetime: string;
        repeat: ERpeat;
    };
    color: string;
    createdDate: Date;

    user: TUser | string
}

export type TTask = {
    task: string;
    completed: boolean;
}

export type TImage = {
    path: string;
    uri: string;
}

// Define the TTask schema
const taskSchema = new mongoose.Schema<TTask>({
    task: { type: String, required: true },
    completed: { type: Boolean, required: true },
});

// Define the TImage schema
const imageSchema = new mongoose.Schema<TImage>({
    path: { type: String },
    uri: { type: String },
});

// Define the TNote schema
const noteSchema = new mongoose.Schema<TNote>({
    title: { type: String },
    body: { type: String },
    list: [taskSchema],
    imgs: [imageSchema],
    reminder: {
        datetime: { type: String },
        repeat: { type: String, enum: Object.values(ERpeat) },
    },
    color: { type: String },
    createdDate: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Create models from schemas
const Note = mongoose.model('Note', noteSchema);

// Export models
export { Note };
