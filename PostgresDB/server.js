import express from "express";
import cors from "cors";
import { initDatabase } from "./initDb.js";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test API
app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

// Insert data API
app.post("/info", async (req, res) => {
  const {
    username,
    description,
    machine_name,
    equipment_no,
    version,
    start_time,
    end_time,
  } = req.body;

  const result = await pool.query(
    `INSERT INTO Info
     (username, description, machine_name, equipment_no, version, start_time, end_time)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [
      username,
      description,
      machine_name,
      equipment_no,
      version,
      start_time,
      end_time,
    ]
  );

  res.json(result.rows[0]);
});

// Start server
const PORT = 5000;
app.listen(PORT, async () => {
  await initDatabase();
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
