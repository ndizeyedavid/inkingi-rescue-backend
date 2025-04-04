import express from "express";
import userRouter from "./routes/users.route.js";
import reportRouter from "./routes/report.route.js";
import commentRouter from "./routes/comment.route.js";
import messageRouter from "./routes/message.route.js";
import volunteerRouter from "./routes/volunteer.route.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/reports", reportRouter);
router.use("/comment", commentRouter);
router.use("/message", messageRouter);
router.use("/volunteer", volunteerRouter);

export default router;
