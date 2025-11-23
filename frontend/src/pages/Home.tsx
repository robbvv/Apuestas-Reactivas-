import { Container, Row, Col } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
import { ActionCard } from "../components/ActionCard";

const HomePage = () => {
  const { user } = useAuthStore();

  const loggedInCards = [
    {
      title: "Browse Events",
      description: "Browse through all available events and place your bets.",
      to: "/event-list",
      buttonLabel: "Go to events",
    },
    {
      title: "Create Event",
      description: "Create your own event.",
      to: "/event-form",
      buttonLabel: "Create event",
    },
    {
      title: "My Profile",
      description: "Check balance and bet history.",
      to: "/me",
      buttonLabel: "View profile",
    },
  ];

  const defaultCards = [
    {
      title: "Browse Events",
      description: "Take a look at the events available.",
      to: "/event-list",
      buttonLabel: "View events",
    },
    {
      title: "Log in",
      description: "Access your account and start betting.",
      to: "/login",
      buttonLabel: "Log in",
    },
    {
      title: "Register",
      description: "Create an account to place bets and create events.",
      to: "/register",
      buttonLabel: "Register",
    },
  ];

  const cards = user ? loggedInCards : defaultCards;

  return (
    <Container className="py-4">
      {user ? (
        <h1 className="mb-4">
          Welcome, {user.username}. What would you like to do?
        </h1>
      ) : (
        <>
          <h1 className="mb-3">Welcome to Apuestas Reactivas 🎮🏆🏀!</h1>
          <p className="mb-4">
            Browse events, log in or register to start betting.
          </p>
        </>
      )}

      <Row className="g-4">
        {cards.map((card) => (
          <Col key={card.title} xs={12} md={4}>
            <ActionCard
              title={card.title}
              description={card.description}
              goTo={card.to}
              buttonText={card.buttonLabel}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;