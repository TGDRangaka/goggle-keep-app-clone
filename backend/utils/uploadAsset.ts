import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 } from 'uuid';

export const uploadAssetToFirebase = async (file: any): Promise<string> => {
    const { buffer, mimetype } = file;
    const storageRef = ref(storage, `uploads/${v4()}`);

    const blob = new Blob([buffer], { type: mimetype });

    // Upload the blob to Firebase Storage
    try {
        await uploadBytes(storageRef, blob)
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
}
