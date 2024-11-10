import { TNote } from "@/types/TNote";
import api, { EAPIS } from "./api";
import { TImage } from "@/types/TImage";
import { TUser } from "@/types/TUser";

export default class NoteService {
    static getAll = async (userId: string): Promise<TNote[]> => {
        try {
            const { data } = await api.get(EAPIS.NOTE, {
                headers: {
                    'x-userid': userId
                }
            });
            // console.log(data.data.length);
            return data.data;
        } catch (err: any) {
            console.error(err);
            throw new Error('Error fetching notes: ' + err.message);
        }
    }



    static save = async (note: TNote, newImgs: TImage[], user: TUser) => {
        try {
            const { title, body, list, color, reminder } = note;
            // formdata
            const formData = new FormData();

            title && formData.append('title', title);
            body && formData.append('body', body);
            color && formData.append('color', color);
            reminder && formData.append('reminder', JSON.stringify(reminder));
            list && formData.append('list', JSON.stringify(list));

            for (let i = 0; i < newImgs.length; i++) {
                const filename = newImgs[i].uri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename!);
                const type = match ? `image/${match[1]}` : 'image';

                formData.append('file', {
                    uri: newImgs[i].uri,
                    name: filename,
                    type: type,
                });
            }

            const { status, data } = await api.post(
                EAPIS.NOTE,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data', 'x-userid': user._id } }
            );
            if (status === 201) {
                // console.log(data.data);
                return data.data;
            }
            throw new Error('Failed to save note ', data);
        } catch (err: any) {
            console.error(err);
            throw new Error('Error saving note: ' + err.message);
        }
    }

    static update = async (note: TNote, newImgs: TImage[]) => {
        try {
            const { title, body, list, color, reminder } = note;
            // formdata
            const formData = new FormData();

            title && formData.append('title', title);
            body && formData.append('body', body);
            color && formData.append('color', color);
            reminder && formData.append('reminder', JSON.stringify(reminder));
            list && formData.append('list', JSON.stringify(list));

            for (let i = 0; i < newImgs.length; i++) {
                const filename = newImgs[i].uri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename!);
                const type = match ? `image/${match[1]}` : 'image';

                formData.append('file', {
                    uri: newImgs[i].uri,
                    name: filename,
                    type: type,
                });
            }

            const { status, data } = await api.put(`${EAPIS.NOTE}/${note._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (status === 200) {
                // console.log(data.data);
                return data.data;
            }
            throw new Error('Failed to save note ', data);
        } catch (err: any) {
            console.error(err);
            throw new Error('Error saving note: ' + err.message);
        }
    }
}