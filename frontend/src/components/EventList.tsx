import { useState, useEffect } from 'react';
import eventService from "../services/events";
import type { EventData } from '../types/event';

const EventList = () => {

	const [events, setEvents] = useState<EventData[]>([]);

	useEffect(() => {
		console.log("entrando en use effect");
		eventService.getAllEvents().then((initialEvents) => {
		setEvents(initialEvents);
		});
	}, []);

	return (
		<div>
			<h1>Listado de Eventos Reactivos</h1>
			{events.}
		</div>
	)
}