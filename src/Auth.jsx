import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "your_jwt_secret"; // Change this to a strong secret in production

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // XAMPP default
  database: "splitwise",
});

db.connect(err => {
  if (err) console.log("MySQL connection error:", err);
  else console.log("Connected to MySQL");
});

// -------- SIGNUP --------
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err2, result2) => {
        if (err2) return res.status(500).json({ error: err2.message });

        // Generate JWT token
        const token = jwt.sign({ id: result2.insertId, name, email }, JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "Signup successful", token, user: { id: result2.insertId, name, email } });
      }
    );
  });
});

// -------- LOGIN --------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(400).json({ error: "User not found" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    const { password: _, ...userData } = user; // remove password
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token, user: userData });
  });
});

export default router;
