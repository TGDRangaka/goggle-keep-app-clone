import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.2:3000/google-keep/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api;