import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";
import dbConnect from "./database/dbConnect.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port:", port);
});

dbConnect();

/*  

status codes
============

200 => ok
201 => created
400 => bad request
500 => internal server error
403 => unathorized access

*/

app.use("/api", router);
