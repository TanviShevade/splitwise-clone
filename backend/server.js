import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js"; // NEW

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded images

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes); // NEW

app.get("/", (req, res) => res.send("Splitwise API running"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
