import mongoose from "mongoose";

export type TUser = {
    _id: mongoose.Types.ObjectId;
    idToken: string,
    name: string, 
    photoUrl: string,
    email: string,
}

const userSchema = new mongoose.Schema<TUser>({
    idToken: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    photoUrl: { type: String, required: true },
    email: { type: String, required: true, unique: true },
})

export const User = mongoose.model<TUser>("User", userSchema);