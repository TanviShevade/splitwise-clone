import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function SettleUpModal({
  show,
  handleClose,
  currentUser,
  otherUser,
  onSettleUp
}) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleCashPayment = () => {
    const settleAmount = Number(amount);
    if (!settleAmount || settleAmount <= 0) return;

    onSettleUp({
      payerId: currentUser.id,
      receiverId: otherUser.id,
      amount: settleAmount,
      note,
      date
    });

    setAmount("");
    setNote("");
    setDate("");
    handleClose();
  };

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Header className="bg-success text-white">
        <Modal.Title>Settle up</Modal.Title>
        <Button variant="close" onClick={handleClose} />
      </Modal.Header>

      <Modal.Body>
        <h5 className="mb-3 text-center">Record a cash payment</h5>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Note (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="success"
          className="w-100"
          style={{ backgroundColor: "#5fc9a7", border: "none" }}
          onClick={handleCashPayment}
        >
          Save payment
        </Button>

        <p className="text-muted mt-3" style={{ fontSize: 13 }}>
          This only records a cash payment. No money is transferred.
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default SettleUpModal;
