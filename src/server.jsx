const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "splitwise"
});


app.post("/add-expense", (req, res) => {
  const { groupId, description, amount, paidBy, date } = req.body;

  const sql = `
    INSERT INTO expenses (group_id, description, amount, paid_by, expense_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [groupId, description, amount, paidBy, date], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});


app.get("/group-balance/:groupId", (req, res) => {
  const groupId = req.params.groupId;

  const sql = `
    SELECT 
      SUM(amount) AS total,
      COUNT(DISTINCT paid_by) AS people
    FROM expenses
    WHERE group_id = ?
  `;

  db.query(sql, [groupId], (err, result) => {
    if (err) return res.status(500).json(err);

    const total = result[0].total || 0;
    const people = result[0].people || 1;
    const perPerson = (total / people).toFixed(2);

    res.json({ total, perPerson });
  });
});

