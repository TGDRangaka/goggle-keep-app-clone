import { TNote } from "@/types/TNote";
import api from "./api";

export default class NoteService {
    static save = async (note: TNote) => {
        try {
            const { status, data } = await api.post('/note', note);
            if (status === 201) {
                return data.data;
            }
            throw new Error('Failed to save note ', data);
        } catch (err: any) {
            console.error(err.message);
            throw new Error('Error saving note: ' + err.message);
        }
    }
}