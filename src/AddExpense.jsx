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
import { useLocation, useNavigate } from "react-router-dom";

function AddExpense() {
  const { state } = useLocation(); // group data
  const navigate = useNavigate();

  if (!state) return <h4 className="text-center mt-5">No group data</h4>;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(state.members[0].name);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const saveExpense = () => {
    if (!description || !amount || !paidBy) {
      alert("Please fill all fields");
      return;
    }

    const expense = {
      id: Date.now(),
      type: "expense",
      description,
      amount: Number(amount),
      paidBy,
      splitBetween: state.members.map(m => m.name),
      date
    };

    const key = `expenses_${state.name}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    const updated = [...stored, expense];

    localStorage.setItem(key, JSON.stringify(updated));

    navigate("/group", { state });
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="success" variant="dark" className="px-4">
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Splitwise
        </Navbar.Brand>

        <Nav className="ms-auto">
          <NavDropdown title={state.members[0].name} align="end">
            <NavDropdown.Item onClick={() => navigate("/")}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>

      {/* BODY */}
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow">
              <Card.Body>
                <h5 className="mb-4 text-center">Add an expense</h5>

                {/* DESCRIPTION */}
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    placeholder="What was this expense for?"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </Form.Group>

                {/* AMOUNT */}
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                </Form.Group>

                {/* PAID BY */}
                <Form.Group className="mb-3">
                  <Form.Label>Paid by</Form.Label>
                  <Form.Select
                    value={paidBy}
                    onChange={e => setPaidBy(e.target.value)}
                  >
                    {state.members.map(m => (
                      <option key={m.name} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* SPLIT INFO */}
                <div className="mb-3 text-muted">
                  Split equally among{" "}
                  <b>{state.members.length}</b> people
                </div>

                {/* DATE */}
                <Form.Group className="mb-4">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
                </Form.Group>

                {/* ACTIONS */}
                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => navigate("/group", { state })}
                  >
                    Cancel
                  </Button>
                  <Button variant="success" onClick={saveExpense}>
                    Save expense
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddExpense;
