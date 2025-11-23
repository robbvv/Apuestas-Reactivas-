import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCoins } from "react-icons/fa";

const NavigationBar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container fluid>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto align-items-center">
            <Navbar.Brand as={NavLink} to="/" end className="fw-bold fs-4">
              Apuestas Reactivas <span className="text-warning">🎮🏆🏀</span>
            </Navbar.Brand>

            <Nav.Link as={NavLink} to="/event-list">
              Events
            </Nav.Link>

            <Nav.Link as={NavLink} to="/event-form">
              New Event
            </Nav.Link>

            <Nav.Link as={NavLink} to="/ranking">
              Ranking
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            {!user && (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Log in
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}

            {user && (
              <>
                <span
                  className="badge bg-warning text-dark d-flex align-items-center me-3"
                  style={{
                    padding: "0.45rem 0.7rem",
                    fontSize: "1rem",
                    gap: "0.4rem",
                  }}
                >
                  <FaCoins style={{ fontSize: "1.2rem" }} />
                  {user.coins}
                </span>

                <Nav.Link as={NavLink} to="/me">
                  My Profile
                </Nav.Link>

                <Nav.Link onClick={handleLogout} className="text-danger">
                  Log out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};

export default NavigationBar;