import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.3:3000/google-keep/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api;

export enum EAPIS {
    USER = '/user',
    USER_CHECK = '/user/verify',

    NOTE = '/note',
    NOTE_LISTS = '/note/lists',
    NOTE_REMINDERS = '/note/reminders',
    NOTE_COLOR = '/note/color',
    NOTE_IMAGES = '/note/images'
}