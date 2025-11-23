import { Container, Row, Col, Form, InputGroup, Button, Card, Badge } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventsStore } from '../store/eventsStore';
import { useAuthStore } from '../store/authStore';

const EventList = () => {
  const { events, getAllEvents } = useEventsStore();
  const { restoreLogin } = useAuthStore();
	const [search, setNewSearch] = useState<string>("");
  const navigate = useNavigate();

	useEffect(() => {
    const init = async () => {
      await getAllEvents();
      await restoreLogin();
    }
    init();
	}, [getAllEvents]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewSearch(event.target.value);
  };

	const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

	return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={6}>
          <h2 className="mb-3 mb-md-0">Events</h2>
        </Col>
        <Col xs={12} md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={handleSearchChange}
            />
            {search && (
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => setNewSearch("")}
              >
                Clear
              </Button>
            )}
          </InputGroup>
        </Col>
      </Row>

      <Row className="g-4">
        {filteredEvents.length === 0 && (
          <Col>
            <p>No events found.</p>
          </Col>
        )}

        {filteredEvents.map((event) => {
          const isUpcoming = new Date(event.date) > new Date();
          const stateText = isUpcoming ? "upcoming" : "finished";
          const stateVariant = isUpcoming ? "success" : "secondary";

          return (
            <Col key={event.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-start">
                    <span>{event.title}</span>
                    <Badge bg={stateVariant}>{stateText}</Badge>
                  </Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">
                    {event.sport} · {event.location}
                  </Card.Subtitle>

                  <Card.Text className="mb-2">
                    Organizer: <strong>{event.organizer}</strong>
                    <br />
                    Pool: <strong>{event.pool}</strong> · Bets:{" "}
                    <strong>{event.betsCount}</strong>
                    <br />
                    Min bet: <strong>{event.minBet}</strong>
                  </Card.Text>

                  <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                    Date: {new Date(event.date).toLocaleString()}
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="bg-transparent border-0">
                  <div className="d-grid">
                    <Button
                      onClick={()=>navigate(`/event-page/${event.id}`)}
                      variant="primary"
                    >
                      More info
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default EventList;