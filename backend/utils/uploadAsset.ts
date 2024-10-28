import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 } from 'uuid';
import { TImage } from "../models/Note";

export const uploadAssetToFirebase = async (file: any): Promise<TImage> => {
    const { buffer, mimetype } = file;
    const path = `uploads/${v4()}`;
    const storageRef = ref(storage, path);

    const blob = new Blob([buffer], { type: mimetype });

    // Upload the blob to Firebase Storage
    try {
        await uploadBytes(storageRef, blob)
        const uri = await getDownloadURL(storageRef);
        return { path, uri };
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
}
