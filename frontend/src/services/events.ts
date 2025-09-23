import axios from "axios";
import type { EventData } from "../types/event";

const baseUrl = "http://localhost:3001/events";

const getAllEvents = (): Promise<EventData[]> => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const createEvent = (event: Omit<EventData, "id">): Promise<EventData> => {
    const request = axios.post(baseUrl, event);
    return request.then((response) => response.data);
};

export default {
    getAllEvents,
    createEvent,
};