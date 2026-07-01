import express from "express";
import pool from "../db.js";

const router = express.Router();

// Add expense
router.post("/add", async (req, res) => {
  try {
    const { groupId, description, amount, paidBy, date } = req.body;
    const [result] = await pool.query(
      "INSERT INTO expenses (group_id, description, amount, paid_by, date) VALUES (?, ?, ?, ?, ?)",
      [groupId, description, amount, paidBy, date]
    );
    res.json({ message: "Expense added", expenseId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get expenses of a group
router.get("/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const [rows] = await pool.query(
      "SELECT * FROM expenses WHERE group_id = ?",
      [groupId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
