import axios from "axios";
import type { EventData } from "../types/event";

const baseUrl = "http://localhost:3001";

const getAllEvents = (): Promise<EventData[]> => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

export default {
    getAllEvents,
};