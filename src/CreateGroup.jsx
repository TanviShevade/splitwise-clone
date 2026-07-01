import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Card
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function CreateGroup({ user, setUser }) {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([{ name: "", email: "" }]);
  const [groupImage, setGroupImage] = useState(null); // ✅ image state

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  /* ===== IMAGE UPLOAD ===== */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(URL.createObjectURL(file)); // ✅ create preview URL
    }
  };

  const addMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const saveGroup = () => {
    if (!groupName.trim()) {
      alert("Please enter group name");
      return;
    }

    for (let m of members) {
      if (!m.name || !m.email || !isValidEmail(m.email)) {
        alert("All members must have valid name & email");
        return;
      }
    }

    const groupData = {
      name: groupName,
      members: [{ name: user.name, email: user.email }, ...members],
      image: groupImage // ✅ PASS IMAGE
    };

    navigate("/group", { state: groupData });
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="success" variant="dark" className="px-4">
        <Navbar.Brand onClick={() => navigate("/dashboard")}>
          Splitwise
        </Navbar.Brand>

        <Nav className="ms-auto">
          <NavDropdown title={user.name} align="end">
            <NavDropdown.Item onClick={handleLogout}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>

      {/* CARD */}
      <Container className="d-flex justify-content-center mt-5">
        <Card style={{ width: "900px" }} className="shadow">
          <Card.Body>
            <h6 className="text-muted text-center mb-4">
              START A NEW GROUP
            </h6>

            {/* IMAGE */}
            <Row className="mb-4 align-items-center">
              <Col md={3} className="text-center">
                <img
                  src={groupImage || "https://via.placeholder.com/120"}
                  alt="group"
                  className="rounded mb-2"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
              </Col>
              <Col md={9}>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
              </Col>
            </Row>

            {/* GROUP NAME */}
            <Form.Control
              className="mb-4"
              placeholder="My group shall be called..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

            {/* MEMBERS */}
            <h6 className="text-muted">GROUP MEMBERS</h6>
            <p><b>{user.name}</b> ({user.email})</p>

            {members.map((m, i) => (
              <Row key={i} className="mb-3">
                <Col>
                  <Form.Control
                    placeholder="Name"
                    value={m.name}
                    onChange={(e) => {
                      const copy = [...members];
                      copy[i].name = e.target.value;
                      setMembers(copy);
                    }}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Email"
                    value={m.email}
                    onChange={(e) => {
                      const copy = [...members];
                      copy[i].email = e.target.value;
                      setMembers(copy);
                    }}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeMember(i)}
                  >
                    ✕
                  </Button>
                </Col>
              </Row>
            ))}

            <Button variant="link" onClick={addMember}>
              + Add a person
            </Button>

            <div className="text-end mt-4">
              <Button variant="success" onClick={saveGroup}>
                Save
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default CreateGroup;
