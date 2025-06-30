// backend/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";

const app = express();

// basic middleware
app.use(cors());
app.use(express.json());

// mount all four NASA routes at /api/…
app.use("/api", routes);

// optional health check
app.get("/", (_, res) => res.send("🛰️  NASA backend alive"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀  API listening on http://localhost:${PORT}`)
);
