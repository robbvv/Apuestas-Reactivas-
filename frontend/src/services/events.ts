import axios from "axios";
import type { EventData } from "../types/event";
import axiosSecure from "../utils/axiosSecure";

const baseUrl = "/api/bets";

const getAllEvents = async (): Promise<EventData[]> => {
    const request = await axios.get(baseUrl);
    return request.data;
};

const getById = async (id: number): Promise<EventData> => {
    const request = await axios.get(`${baseUrl}/${id}`);
    return request.data;
};

const createEvent = async (event: Omit<EventData, "id">): Promise<EventData> => {
    const request = await axiosSecure.post(baseUrl, event);
    return request.data;
};

const betEvent = async (id: String, option: String, amount: number) => {
    const request = await axiosSecure.post(`${baseUrl}/${id}`, {option: option, amount: amount});
    return request.data;
}

export default {
    getAllEvents,
    getById,
    createEvent,
    betEvent,
};