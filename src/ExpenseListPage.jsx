import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  ListGroup
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function ExpenseListPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h4 className="text-center mt-5">No data</h4>;

  const { group, expense } = state;

  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="success" variant="dark" className="px-4">
        <Navbar.Brand onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
          Splitwise
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title={group.members[0].name} align="end">
              <NavDropdown.Item>Account</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/create-group")}>
                Create group
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate("/")}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* BODY */}
      <Container fluid className="mt-3">
        <Row>
          {/* LEFT SIDEBAR */}
          <Col md={3} className="border-end p-3">
            <h6>GROUPS</h6>
            <ListGroup>
              <ListGroup.Item active>{group.name}</ListGroup.Item>
            </ListGroup>

            <h6 className="mt-4">FRIENDS</h6>
            <ListGroup>
              {group.members.map((m, i) => (
                <ListGroup.Item key={i}>{m.name}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* CENTER */}
          <Col md={6} className="p-3">
            <h4>
              {group.name} <small className="text-muted">2 people</small>
            </h4>

            <div className="d-flex justify-content-end my-2">
              <Button
                variant="warning"
                className="me-2"
                onClick={() => navigate("/add-expense", { state: group })}
              >
                Add an expense
              </Button>
              <Button variant="success">Settle up</Button>
            </div>

            <hr />

            {/* EXPENSE ENTRY */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="text-center me-3">
                  <div className="fw-bold">{expense.day}</div>
                  <small className="text-muted">{expense.month}</small>
                </div>

                <div>
                  <b>{expense.description}</b>
                  <div className="text-muted">{expense.paidBy}</div>
                </div>
              </div>

              <div className="text-end">
                <div><b>Rs. {expense.amount}</b></div>
                <small className="text-success">
                  you lent {expense.lent}
                </small>
              </div>
            </div>
          </Col>

          {/* RIGHT SIDEBAR */}
          <Col md={3} className="border-start p-3">
            <h6>GROUP BALANCES</h6>

            {group.members.map((m, i) => (
              <div key={i} className="mb-2">
                <b>{m.name}</b>
                <br />
                <small className={i === 0 ? "text-danger" : "text-success"}>
                  {i === 0 ? "owes Rs. 2500" : "gets back Rs. 2500"}
                </small>
              </div>
            ))}

            <a href="#" className="text-decoration-none">
              View details »
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ExpenseListPage;
