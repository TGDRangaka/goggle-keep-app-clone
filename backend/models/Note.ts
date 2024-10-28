import mongoose from 'mongoose';

export type TNote = {
    _id: mongoose.Types.ObjectId;
    title: string;
    body: string;
    list: TTask[];
    imgs: TImage[];
    reminder: Date;
    color: string;
    createdDate: Date;
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
    reminder: { type: Date },
    color: { type: String },
    createdDate: { type: Date, default: Date.now },
});

// Create models from schemas
const Note = mongoose.model('Note', noteSchema);

// Export models
export { Note };
