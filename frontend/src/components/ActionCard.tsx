import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  goTo: string;
  buttonText: string;
}

export function ActionCard({ title, description, goTo, buttonText }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(goTo);
  };

  return (
    <Card style={{ width: "100%" }} className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="flex-grow-1">{description}</Card.Text>
        <Button variant="primary" onClick={handleClick}>
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}
