import express from "express";
import userRouter from "./routes/users.route.js";
import commentRouter from "./routes/comment.route.js";
// import messageRouter from "./routes/message.route.js";
import volunteerRouter from "./routes/volunteer.route.js";
import sosRouter from "./routes/sos.route.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/sos", sosRouter);
router.use("/comment", commentRouter);
// router.use("/message", messageRouter);  // coming soon
router.use("/volunteer", volunteerRouter);

export default router;
