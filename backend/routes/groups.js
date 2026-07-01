import express from "express";
import pool from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads/groups";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "_" + file.originalname.replace(/\s/g, "_")
    );
  },
});
const upload = multer({ storage });

// ================= CREATE GROUP =================
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, createdBy, members } = req.body;

    if (!name || !createdBy || !members) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const membersArray = JSON.parse(members);

    // IMAGE
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/groups/${req.file.filename}`;
    }

    // INSERT GROUP
    const [result] = await pool.query(
      "INSERT INTO groups (name, created_by, image) VALUES (?, ?, ?)",
      [name, createdBy, imagePath]
    );

    const groupId = result.insertId;

    // INSERT MEMBERS (including creator)
    const allMembers = [{ name: "Creator", user_id: createdBy, email: "" }, ...membersArray];

    for (let m of allMembers) {
      await pool.query(
        "INSERT INTO group_members (group_id, user_id, name, email) VALUES (?, ?, ?, ?)",
        [groupId, m.user_id || null, m.name, m.email || null]
      );
    }

    res.json({
      message: "Group created successfully",
      groupId,
      group: {
        id: groupId,
        name,
        image: imagePath,
        members: allMembers,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create group. Try again." });
  }
});

export default router;
