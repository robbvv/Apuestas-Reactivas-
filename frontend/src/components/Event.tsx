import type { EventData } from "../types/event"

interface EventProp {
  event: EventData;
}

const borderStyle = {
  border: "1px solid gray",
  padding: "8px",
  margin: "5px 0"
};

const Event = ({ event: event }: EventProp) => (
  <div style={borderStyle}>
    <div>
    Title: {event.title}
    </div>
    <div>
    Sport: {event.sport} | Organizer: {event.organizer} | Last Updated: {event.updatedAt ? new Date(event.updatedAt).toLocaleString() : new Date(event.createdAt).toLocaleString()}
    </div>
    <div>
    Stars: [{event.stars}] | Pool: [{event.pool}] | State: {event.active ? "upcoming" : "finished"}
    </div>
  </div>
)

export default { Event };
