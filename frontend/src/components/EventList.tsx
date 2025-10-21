import { useState, useEffect } from 'react';
import eventService from "../services/events";
import { Link } from 'react-router-dom';
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
		<div>
			<h2>Event list</h2>
			<input
				type="text"
				placeholder="Buscar por título..."
				value={search}
				onChange={handleSearchChange}
			/>
			<div>
				{filteredEvents.map((event) => (
					<>
						<Event key={event.id} event={event} />
						<Link to={`/event-page/${event.id}`} key={event.id} className="event-link">More info</Link>
					</>
				))}
			</div>
		</div>
	);
}

export default EventList;