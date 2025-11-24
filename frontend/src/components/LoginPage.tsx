import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";


const LoginPage = () => {
  const { user, loginError, login, logout, restoreLogin , clearError} = useAuthStore();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    restoreLogin();
    clearError();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ username: username, password: password });
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    logout()
  };

  if(user){
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title className="mb-3">You are already logged in</Card.Title>
                <Card.Text className="mb-3">
                  Signed in as <strong>{user.username}</strong>.
                </Card.Text>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Log out
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-center" data-testid="login-card-title">Log in</Card.Title>

              {loginError && (
                <Alert variant="danger" className="mb-3">
                  {loginError}
                </Alert>
              )}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4" controlId="loginUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button name="Log in" type="submit" variant="primary">
                    Log in
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;