import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routers/index.js";
import dbConnect from "./database/dbConnect.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port:", port);
});

dbConnect();
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Backend is live and operatable" });
});
app.use("/api", router);
app.use("/uploads", express.static("uploads"));
