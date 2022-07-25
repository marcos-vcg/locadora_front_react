import axios from "axios";
import { SERVER_URL } from "../config";

const api = axios.create({
    baseURL: SERVER_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});


export default api;