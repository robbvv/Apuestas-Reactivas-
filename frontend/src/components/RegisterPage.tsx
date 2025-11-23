import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import userService from "../services/user";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState<string>("")
  const [newEmail, setNewEmail] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if(user)
      navigate("/me");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!newUsername.trim() || !newEmail.trim() || !newPassword.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setErrorMessage("Email is not valid.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    
    const newUser = {
      username: newUsername,
      email: newEmail,
      password: newPassword
    };

    try {
      await userService.createUser(newUser);

      setSuccessMessage("User created successfully!");
      setNewUsername("");
      setNewEmail("");
      setNewPassword("");
    } catch (err: any) {
      if (err.response?.data?.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-center">Register</Card.Title>

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
                <Form.Group className="mb-4" controlId="registerUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </Form.Group>


                <Form.Group className="mb-4" controlId="registerEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="registerPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="primary">
                    Register
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  /*
  return (
    <div className="main-container">
      <h1>Sign up</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="form-inline">Username: <input
          type="text"
          value={newUsername}
          placeholder="Type your username"
          onChange={handleUsernameChange}
        />
        </label>
        <label className="form-inline">Email: <input
          type="text"
          value={newEmail}
          placeholder="Type you email"
          onChange={handleEmailChange}
        />
        </label>
        <label className="form-inline">Password: <input
          type="password"
          value={newPassword}
          placeholder="Type your password"
          onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  )
  */
}

export default RegisterPage;