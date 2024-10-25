import mongoose from 'mongoose';

export type TNote = {
    _id: mongoose.Types.ObjectId;
    title: string;
    body: string;
    list: TTask[];
    imgs: string[];
    reminder: Date;
    color: string;
    createdDate: Date;
}

export type TTask = {
    _id: mongoose.Types.ObjectId;
    task: string;
    completed: boolean;
}

// Define the TTask schema
const taskSchema = new mongoose.Schema<TTask>({
    task: { type: String, required: true },
    completed: { type: Boolean, required: true },
});

// Define the TNote schema
const noteSchema = new mongoose.Schema<TNote>({
    title: { type: String },
    body: { type: String },
    list: [taskSchema],
    imgs: { type: [String], default: [] },
    reminder: { type: Date },
    color: { type: String },
    createdDate: { type: Date, default: Date.now },
});

// Create models from schemas
const Note = mongoose.model('Note', noteSchema);

// Export models
export { Note };
