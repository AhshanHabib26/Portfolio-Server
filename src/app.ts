import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import authHandler from "./user/user.router";
import experineceHandler from "./experience/experience.router";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Application API
app.use("/api/auth", authHandler);
app.use("/api/experience", experineceHandler);

app.get("/", (req, res) => {
  res.send("Welcome to M A AHSHAN HABIB World!");
});

// Global Error Handler
app.use(errorHandler);

export default app;
