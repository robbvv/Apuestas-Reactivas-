import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Event from './Event';
import "../styles/event-list.css";
import { useEventsStore } from '../store/eventsStore';

const EventList = () => {
  const { events, getAllEvents } = useEventsStore();
	const [search, setNewSearch] = useState<string>("");

	useEffect(() => {
		console.log("entrando en use effect");
    const init = async () => {
      await getAllEvents();
    }
    init();
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
					<div key={event.id}>
						<Event event={event} />
						<Link to={`/event-page/${event.id}`} key={event.id} className="event-link">More info</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default EventList;