import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateGroupPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [showExpense, setShowExpense] = useState(true);
  const [showNotes, setShowNotes] = useState(false);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");

  const dateInputRef = useRef(null);

  if (!state) return <h3>No group data</h3>;

  /* ---------- AUTO CALCULATION ---------- */
  const perPerson =
    amount && state.members.length
      ? (amount / state.members.length).toFixed(2)
      : "0.00";

  const formattedDate = new Date(expenseDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  /* ---------- SAVE EXPENSE (LOCAL DB) ---------- */
  const handleSave = () => {
    const newExpense = {
      id: Date.now(),
      description,
      amount: Number(amount),
      perPerson: Number(perPerson),
      date: expenseDate,
      notes,
      paidBy: state.members[0].name
    };

    const key = `expenses_${state.name}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];

    localStorage.setItem(key, JSON.stringify([...existing, newExpense]));

    navigate("/group", { state });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3} className="border-end p-3">
            <h6>GROUPS</h6>
            <p className="text-success fw-bold">
              {state.name} ({state.members.length} people)
            </p>

            <h6 className="mt-4">FRIENDS</h6>
            {state.members.map((m, i) => (
              <p key={i}>{m.name}</p>
            ))}
          </Col>

          <Col md={6}></Col>

          <Col md={3} className="border-start p-3">
            <h6>GROUP BALANCES</h6>
            {state.members.map((m, i) => (
              <p key={i}>
                <b>{m.name}</b>
                <br />
                <small className="text-muted">will update</small>
              </p>
            ))}
          </Col>
        </Row>
      </Container>

      {/* ADD EXPENSE MODAL */}
      <Modal show={showExpense} centered>
        <Modal.Header className="bg-success text-white">
          <Modal.Title>Add an expense</Modal.Title>
          <Button variant="close" onClick={() => navigate(-1)} />
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>With you and:</Form.Label>
            <div className="border rounded px-2 py-1 bg-light">
              {state.members.map(m => m.name).join(", ")}
            </div>
          </Form.Group>

          <div className="text-center mb-3">
            <Form.Control
              className="mb-2 text-center"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <h2>
              Rs.{" "}
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  border: "none",
                  borderBottom: "1px dashed #999",
                  textAlign: "center",
                  width: 120,
                  outline: "none"
                }}
              />
            </h2>

            <p className="mb-0">
              Paid by <span className="text-success">you</span> and split{" "}
              <span className="text-success">equally</span>
            </p>
            <small>(Rs. {perPerson}/person)</small>
          </div>

          {/* DATE + NOTES */}
          <div className="d-flex justify-content-between mb-2">
            <Button
              variant="outline-secondary"
              onClick={() => dateInputRef.current.showPicker()}
            >
              {formattedDate}
            </Button>

            <input
              ref={dateInputRef}
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
            />

            <Button
              variant="outline-secondary"
              onClick={() => setShowNotes(true)}
            >
              Add image/notes
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ADD NOTES MODAL */}
      <Modal show={showNotes} onHide={() => setShowNotes(false)} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Add image/notes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Add notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={() => setShowNotes(false)}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateGroupPage;
