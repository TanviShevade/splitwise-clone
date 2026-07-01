import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Row,
  Col,
  Card,
  Form
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  // ✅ NEW: recent activity state
  const [recentActivities, setRecentActivities] = useState([]);

  if (!user) return <h3 className="text-center mt-5">Please login first</h3>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // ✅ NEW: load recent activity
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentActivities")) || [];
    setRecentActivities(stored.slice(0, 5)); // show latest 5
  }, []);

  return (
    <>
      {/* TOP NAVBAR */}
      <Navbar bg="success" variant="dark" className="px-4">
        <Navbar.Brand
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/dashboard")}
        >
          Splitwise
        </Navbar.Brand>

        <Nav className="ms-auto">
          <NavDropdown title={user.name} align="end">
            <NavDropdown.Item>Your account</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/create-group")}>
              Create a group
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>

      {/* MAIN LAYOUT */}
      <Container fluid>
        <Row>
          {/* LEFT SIDEBAR */}
          <Col
            md={2}
            className="p-3"
            style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
          >
            {/* DASHBOARD + RECENT ACTIVITY */}
            <div className="bg-light p-2 mb-3 rounded">
              <strong>Dashboard</strong>

              <div className="mt-3">
                <small className="text-muted fw-bold">RECENT ACTIVITY</small>

                {recentActivities.length === 0 ? (
                  <div className="text-muted mt-2">
                    No recent activity
                  </div>
                ) : (
                  recentActivities.map((a) => (
                    <div key={a.id} className="mt-2">
                      <small>{a.text}</small>
                      <br />
                      <small className="text-muted">{a.date}</small>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* GROUPS */}
            <div className="bg-light p-2 mb-3 rounded">
              <div className="d-flex justify-content-between">
                <small className="text-muted">GROUPS</small>
                <small
                  className="text-success"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/create-group")}
                >
                  + add
                </small>
              </div>
              <small className="text-muted">
                You do not have any groups yet.
              </small>
            </div>

            {/* FRIENDS */}
            <div className="bg-light p-2 mb-3 rounded">
              <div className="d-flex justify-content-between">
                <small className="text-muted">FRIENDS</small>
                <small className="text-success">+ add</small>
              </div>
              <small className="text-muted">
                You have not added any friends yet.
              </small>
            </div>

            {/* INVITE */}
            <Card>
              <Card.Header className="bg-success text-white">
                Invite friends
              </Card.Header>
              <Card.Body>
                <Form.Control
                  type="email"
                  placeholder="Enter an email address"
                  className="mb-2"
                />
                <button className="btn btn-secondary btn-sm">
                  Send invite
                </button>
              </Card.Body>
            </Card>
          </Col>

          {/* CENTER CONTENT */}
          <Col md={7} className="p-4">
            <Card>
              <Card.Header
                style={{
                  backgroundColor: "#e6e6e6",
                  fontWeight: "bold"
                }}
              >
                Dashboard
              </Card.Header>

              <Card.Body>
                <Row className="align-items-center">
                  <Col md={4} className="text-center">
                    <img
                      src="/mascot.png"
                      alt="Splitwise mascot"
                      style={{ height: "350px" }}
                    />
                  </Col>

                  <Col md={8}>
                    <h3 className="fw-bold">Welcome to Splitwise!</h3>
                    <p className="text-muted">
                      Splitwise helps you split bills with friends.
                    </p>
                    <p className="text-muted">
                      Click “Add an expense” above to get started, or invite
                      some friends first!
                    </p>

                    <button
                      className="btn btn-warning"
                      onClick={() => navigate("/create-group")}
                    >
                      + Add friends on Splitwise
                    </button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT EMPTY COLUMN */}
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
