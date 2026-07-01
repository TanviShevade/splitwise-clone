import express from "express";
import pool from "../db.js";

const router = express.Router();

// Record a settlement
router.post("/add", async (req, res) => {
  try {
    const { groupId, payerId, receiverId, amount, date, note } = req.body;

    const [result] = await pool.query(
      "INSERT INTO settlements (group_id, payer_id, receiver_id, amount, date, note) VALUES (?, ?, ?, ?, ?, ?)",
      [groupId, payerId, receiverId, amount, date, note]
    );

    res.json({ message: "Settlement recorded", settlementId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get settlements of a group
router.get("/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const [rows] = await pool.query(
      "SELECT * FROM settlements WHERE group_id = ?",
      [groupId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
