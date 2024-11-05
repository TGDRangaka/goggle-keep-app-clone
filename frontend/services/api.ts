import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.4:3000/google-keep/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api;

export enum EAPIS {
    NOTE = '/note',
    NOTE_LISTS = '/note/lists',
    NOTE_REMINDERS = '/note/reminders',
    // NOTE_SEARCH = '/note/search',
    NOTE_COLOR = '/note/color',
    NOTE_IMAGES = '/note/images'
}