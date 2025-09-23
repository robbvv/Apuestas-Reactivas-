import { useState, useEffect } from 'react';
import eventService from "../services/events";
import type { EventData } from '../types/event';
import Event from './Event';
import "../styles/event-list.css";

const EventList = () => {

	const [events, setEvents] = useState<EventData[]>([]);
	const [search, setNewSearch] = useState<string>("");

	useEffect(() => {
		console.log("entrando en use effect");
		eventService.getAllEvents().then((initialEvents) => {
		setEvents(initialEvents);
		});
	}, []);
	
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewSearch(event.target.value);
  };

	const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

	return (
		<div className="event-list-container">
			<h1>Listado de Eventos</h1>
			<input
				className="event-search"
        type="text"
        placeholder="Buscar por título..."
        value={search}
        onChange={handleSearchChange}
      />
			{filteredEvents.map((event) => (
				<Event key={event.id} event={event} />
			))}
		</div>
	)
}

export default EventList;