import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function CashPaymentModal({ show, onClose, members, onSave }) {
  const [payer, setPayer] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    if (!payer || !recipient || !amount) {
      alert("Select payer, recipient and amount");
      return;
    }

    onSave({
      payer,
      recipient,
      amount: Number(amount),
      date: new Date().toISOString()
    });

    setPayer(null);
    setRecipient(null);
    setAmount("");
  };

  return (
    <Modal show={show} centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settle up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <select className="form-control mb-2" onChange={e => setPayer(members[e.target.value])}>
          <option>Select payer</option>
          {members.map((m, i) => (
            <option value={i} key={m.name}>{m.name}</option>
          ))}
        </select>

        <select className="form-control mb-2" onChange={e => setRecipient(members[e.target.value])}>
          <option>Select recipient</option>
          {members.map((m, i) => (
            <option value={i} key={m.name}>{m.name}</option>
          ))}
        </select>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <Button className="w-100" onClick={handleSave}>
          Save
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default CashPaymentModal;
