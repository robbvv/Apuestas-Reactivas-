import { useState, useEffect } from 'react';
import eventService from "../services/events";
import type { EventData } from '../types/event';
import Event from './Event';
import "../styles/event-list.css";

const EventList = () => {

	const [events, setEvents] = useState<EventData[]>([]);

	useEffect(() => {
		console.log("entrando en use effect");
		eventService.getAllEvents().then((initialEvents) => {
		setEvents(initialEvents);
		});
	}, []);

	return (
		<div className="event-list-container">
			<h1>Listado de Eventos</h1>
			{events.map((event) => (
				<Event key={event.id} event={event} />
			))}
		</div>
	)
}

export default EventList;