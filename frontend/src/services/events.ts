import axios from "axios";
import type { EventData } from "../types/event";
import axiosSecure from "../utils/axiosSecure";

const baseUrl = "/api/bets";

const getAllEvents = (): Promise<EventData[]> => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const getById = (id: number): Promise<EventData> => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};

const createEvent = (event: Omit<EventData, "id">): Promise<EventData> => {
    const request = axiosSecure.post(baseUrl, event);
    return request.then((response) => response.data);
};

const betEvent = (id: String, option: String, amount: number) => {
    const request = axiosSecure.post(`${baseUrl}/${id}`, {option: option, amount: amount});
    return request.then((response) => response.data);
}

export default {
    getAllEvents,
    getById,
    createEvent,
    betEvent,
};