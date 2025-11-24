import { create } from "zustand";
import eventService from "../services/events";
import type { EventData } from "../types/event";

type EventsState = {
  events: EventData[],
  currentEvent: EventData | null,
  
  getAllEvents: () => void,
  getEventById: (id: string) => void,
  placeBetOnEvent: (id: string, option: string, amount: number) => void,
  changeBetStatus: (id: string, status: string, winningOption: string | null) => void,
};

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  currentEvent: null,

  getAllEvents: async () => {
    try {
      const events = await eventService.getAllEvents();
      set({ events: events });
    } catch {
      console.error("Error al obtener los eventos");
    }
  },

  getEventById: async (id) => {
    try {
      const event = await eventService.getById(id);
      set({ currentEvent: event });
    } catch {
      console.error("Error al obtener el evento de id=", id);
    }
  },
  
  placeBetOnEvent: async (id, option, amount) => {
    try {
      const updatedEvent = await eventService.betOnEvent(id, option, amount);
      set(state => ({
        events: state.events.map(e => e.id === id ? updatedEvent : e),
        currentEvent: updatedEvent
      }))
    } catch {
      console.error("Error al apostar en evento de id=", id);
    }
  },

  changeBetStatus: async (id, status, winningOption) => {
    try {
      const updated = await eventService.changeBetStatus(id, status, winningOption);

      set((state) => ({
        events: state.events.map(e => e.id === id ? updated : e),
        currentEvent: updated
      }));
    } catch {
      console.error("Error changing status", id);
    }
  },
}));