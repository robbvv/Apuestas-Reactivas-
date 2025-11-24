import { Container, Row, Col, Card, Form, Button, Alert, InputGroup, ListGroup } from "react-bootstrap";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { UserData } from "../types/user";
import type { EventData } from "../types/event";
import eventService from "../services/events";
import { useAuthStore } from "../store/authStore";

const EventForm = () => {
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [newEventOrganizer, setNewEventOrganizer] = useState<string>("");
  const [newEventEmail, setNewEventEmail] = useState<string>("");
  const [newEventDescription, setNewEventDescription] = useState<string>("");
  const [newEventSport, setNewEventSport] = useState<string>("");
  const [newEventLocation, setNewEventLocation] = useState<string>("");
  const [newEventMinimumBet, setNewEventMinimumBet] = useState<number>(0);
  const [newEventDate, setNewEventDate] = useState<string>("");
  const [newOptions, setNewOptions] = useState<{ name: string; payout: number }[]>([]);
  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionPayout, setNewOptionPayout] = useState<number>(1);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { user, restoreLogin } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await restoreLogin();
      if(!user)
        navigate("/login");
    }
    init();
  }, [])

  if (!user) return (<p>LOADING USER</p>)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventOwner: Partial<UserData> = {
      id: user.id,
      username: user.username,
    }
    if (
      !newEventTitle.trim() ||
      !newEventOrganizer.trim() ||
      !newEventEmail.trim() ||
      !newEventDescription.trim() ||
      !newEventSport.trim() ||
      !newEventLocation.trim() ||
      !newEventDate.trim()
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (newOptions.length < 2) {
      setErrorMessage("You must add at least two bet options.");
      return;
    }

    const newEvent: Omit<EventData, "id"> = {
      owner: eventOwner,
      title: newEventTitle,
      organizer: newEventOrganizer,
      email: newEventEmail,
      description: newEventDescription,
      sport: newEventSport,
      location: newEventLocation,
      date: new Date(newEventDate).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: null,
      minBet: newEventMinimumBet,
      pool: 0,
      betsCount: 0,
      options: newOptions,
      participants: [],
      status: "open",
    };

    try {
      await eventService.createEvent(newEvent);
      setSuccessMessage("Event created successfully!")
    } catch {
      setErrorMessage("The event couldn't be created, try again.")
    }

    setNewEventTitle("");
    setNewEventOrganizer("");
    setNewEventEmail("");
    setNewEventDescription("");
    setNewEventSport("");
    setNewEventLocation("");
    setNewEventMinimumBet(0);
    setNewEventDate("");
    setNewOptions([]);
    setNewOptionName("");
    setNewOptionPayout(1);
  };

  const handleAddOption = () => {
    if (!newOptionName || newOptionPayout <= 0) return;
    setNewOptions([...newOptions, { name: newOptionName, payout: newOptionPayout }]);
    setNewOptionName("");
    setNewOptionPayout(1);
  };

  const handleRemoveOption = (index: number) => {
    setNewOptions(newOptions.filter((_, i) => i !== index));
  };



  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-center">Create a new event</Card.Title>

              {errorMessage && (
                <Alert variant="danger" className="mb-3">
                  {errorMessage}
                </Alert>
              )}

              {successMessage && (
                <Alert variant="success" className="mb-3">
                  {successMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Type the event title"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Label>Organizer</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Type the organizer's name"
                        value={newEventOrganizer}
                        onChange={(e) => setNewEventOrganizer(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type the organizer's email"
                      value={newEventEmail}
                      onChange={(e) => setNewEventEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Describe the event"
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Sport</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Type the event sport"
                          value={newEventSport}
                          onChange={(e) => setNewEventSport(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Type the event location"
                          value={newEventLocation}
                          onChange={(e) => setNewEventLocation(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={12} md={6}>
                      <Form.Group controlId="eventDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={newEventDate}
                          onChange={(e) => setNewEventDate(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} className="mt-3 mt-md-0">
                      <Form.Group controlId="eventMinBet">
                        <Form.Label>Minimum bet</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          value={newEventMinimumBet}
                          placeholder="Minimum bet amount"
                          onChange={(e) => setNewEventMinimumBet(Number(e.target.value))}
                        />
                      </Form.Group>
                    </Col>
                </Row> 
                  <div className="mb-3">
                    <h5>Bet options</h5>
                    <InputGroup className="mb-2">
                      <Form.Control
                        type="text"
                        placeholder="Option name (e.g. Team A wins)"
                        value={newOptionName}
                        onChange={(e) => setNewOptionName(e.target.value)}
                      />
                      <Form.Control
                        type="number"
                        min={1}
                        step={0.1}
                        placeholder="Payout"
                        value={newOptionPayout}
                        onChange={(e) => setNewOptionPayout(Number(e.target.value))}
                        style={{ maxWidth: "130px" }}
                      />
                      <Button variant="outline-primary" type="button" onClick={handleAddOption}>
                        Add option
                      </Button>
                    </InputGroup>

                    {newOptions.length > 0 && (
                      <ListGroup>
                        {newOptions.map((opt, index) => (
                          <ListGroup.Item
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <span>
                              {opt.name} – payout: <strong>{opt.payout}</strong>
                            </span>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              type="button"
                              onClick={() => handleRemoveOption(index)}
                            >
                              Remove
                            </Button>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </div>
                  <Button type="submit" variant="primary">
                    Publish event
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EventForm;