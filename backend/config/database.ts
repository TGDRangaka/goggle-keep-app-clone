
import mongoose from "mongoose";

export const connectDatabase = async (uri: string) => {
    mongoose.connect(uri)
        .then(() => {
            console.log('Database connected');
        })
        .catch((err) => {
            console.error('Error connecting to the database:', err);
            process.exit(1);
        })
}