import axios from "axios";

const api = axios.create({
    baseURL: "https://goggle-keep-app-clone-production.up.railway.app/google-keep/api/v1",
    // baseURL: "http://192.168.225.106:3000/google-keep/api/v1",
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