import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FaCoins } from "react-icons/fa";

const UserPage = () => {
  const { user } = useAuthStore();

  if (!user) return null

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fs-3 mb-3">My Profile</Card.Title>

              <h4 className="mb-3">
                Username: <strong>{user.username}</strong>
              </h4>

              <h5 className="mb-0">
                Coins available:{" "}
                <Badge bg="warning" text="dark">
                  <FaCoins style={{ fontSize: "1.2rem" }} /> {user.coins}
                </Badge>
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Your Bets</Card.Title>

              {user.bets && user.bets.length > 0 ? (
                <ListGroup variant="flush">
                  {user.bets.map((b, i) => (
                    <ListGroup.Item key={i}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Bet #{i + 1}:</strong> {b.option} — {b.amount}
                        </div>
                        <Link to={`/event-page/${b.betId}`}>View</Link>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">You haven't made any bets yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Your Events</Card.Title>

              {user.ownBets && user.ownBets.length > 0 ? (
                <ListGroup variant="flush">
                  {user.ownBets.map((b, i) => (
                    <ListGroup.Item key={i}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Event #{i + 1}:</strong> {b.title}
                        </div>
                        <Link to={`/event-page/${b.id}`}>View</Link>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">You haven't created any events yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;