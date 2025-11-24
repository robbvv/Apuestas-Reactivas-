import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEventsStore } from "../store/eventsStore";

import { 
  Container, Card, Button, Row, Col, Form, Alert, Badge, ListGroup, Stack
} from "react-bootstrap";

const EventPage = () => {
  const { id } = useParams();

  const { user, restoreLogin } = useAuthStore();
  const { currentEvent, getEventById, placeBetOnEvent, changeBetStatus } = useEventsStore();

  const [newBetOption, setNewBetOption] = useState("");
  const [newBetAmount, setNewBetAmount] = useState(0);
  const [winningOption, setWinningOption] = useState("");

  useEffect(() => {
    if (!id) return;
    restoreLogin();
    getEventById(id);
  }, [id]);

  if (!currentEvent) return <p>Loading event...</p>;

  const event = currentEvent;
  const isOwner = user?.id === event.owner.id;

  const stateMap = {
    open: { text: "Upcoming", color: "success" },
    locked: { text: "In Progress", color: "warning" },
    resolved: { text: "Finished", color: "danger" }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newBetOption || newBetAmount <= 0) return;

    await placeBetOnEvent(id, newBetOption, newBetAmount);

    setNewBetOption("");
    setNewBetAmount(event.minBet);
  };

  const handleLockEvent = async () => {
    if (!id) return;
    await changeBetStatus(id, "locked", null);
    getEventById(id);
  };

  const handleResolveEvent = async () => {
    if (!id || !winningOption) return;
    await changeBetStatus(id, "resolved", winningOption);
    getEventById(id);
  };

  return (
    <Container className="py-4">
      <Card className="shadow-lg p-3">
        <Card.Body>
          <Card.Title className="fs-2 fw-bold">{event.title}</Card.Title>

          <Stack direction="horizontal" gap={3} className="mb-3">
            <span><strong>Sport:</strong> {event.sport}</span>
            <span><strong>Organizer:</strong> {event.organizer}</span>
            <Badge bg={stateMap[event.status].color}>
              {stateMap[event.status].text}
            </Badge>
          </Stack>

          <Card.Text>{event.description}</Card.Text>

          <ListGroup className="mb-3">
            <ListGroup.Item>Stars: {event.stars}</ListGroup.Item>
            <ListGroup.Item>Prize Pool: {event.pool}</ListGroup.Item>
            <ListGroup.Item>Participants: {event.betsCount}</ListGroup.Item>
          </ListGroup>

          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>

          {/* VISITOR MESSAGES */}
          {!user && (
            <>
              {event.status === "open" && (
                <Alert variant="primary" className="mt-3">
                  Betting is <strong>open</strong>.  
                  Log in to place a bet.
                </Alert>
              )}

              {event.status === "locked" && (
                <Alert variant="warning" className="mt-3">
                  This event is <strong>locked</strong>.  
                  No more bets can be made.
                </Alert>
              )}

              {event.status === "resolved" && (
                <Alert variant="success" className="mt-3">
                  Event finished. Winner:  
                  <strong> {event.winningOption}</strong>.
                </Alert>
              )}
            </>
          )}

          {/* USER BETTING SECTION */}
          {user && !isOwner && (
            <>
              {event.status === "open" && (
                <Form onSubmit={handleSubmit} className="mt-3">
                  <Row className="g-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Bet options</Form.Label>
                        <Form.Select 
                          value={newBetOption}
                          onChange={(e) => setNewBetOption(e.target.value)}
                        >
                          <option value="">-- Select an option --</option>
                          {event.options.map(opt => (
                            <option key={opt.name} value={opt.name}>
                              {opt.name} (payout: {opt.payout})
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Your bet</Form.Label>
                        <Form.Control 
                          type="number"
                          min={event.minBet}
                          value={newBetAmount}
                          onChange={(e) => setNewBetAmount(Number(e.target.value))}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={2} className="d-flex align-items-end">
                      <Button type="submit" className="w-100">Place Bet</Button>
                    </Col>
                  </Row>
                </Form>
              )}

              {event.status === "locked" && (
                <Alert variant="warning" className="mt-3">
                  <strong>Betting closed.</strong>
                </Alert>
              )}

              {event.status === "resolved" && (
                <Alert variant="success" className="mt-3">
                  <strong>Winner:</strong> {event.winningOption}
                </Alert>
              )}
            </>
          )}

          {/* OWNER PANEL */}
          {user && isOwner && (
            <div className="mt-4">
              <h4>Organizer Panel</h4>

              {event.status === "open" && (
                <>
                  <Alert variant="success">Betting is open.</Alert>
                  <Button variant="warning" onClick={handleLockEvent}>
                    Lock Betting
                  </Button>
                </>
              )}

              {event.status === "locked" && (
                <>
                  <Alert variant="warning">
                    Betting locked. Select the winning option.
                  </Alert>
                  <Form.Select 
                    className="my-2"
                    value={winningOption}
                    onChange={e => setWinningOption(e.target.value)}
                  >
                    <option value="">-- Choose a winner --</option>
                    {event.options.map(opt => (
                      <option key={opt.name} value={opt.name}>{opt.name}</option>
                    ))}
                  </Form.Select>
                  <Button 
                    variant="success"
                    disabled={!winningOption}
                    onClick={handleResolveEvent}
                  >
                    Resolve Event
                  </Button>
                </>
              )}

              {event.status === "resolved" && (
                <Alert variant="info">
                  Event resolved.  
                  Winner: <strong>{event.winningOption}</strong>.
                </Alert>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EventPage;