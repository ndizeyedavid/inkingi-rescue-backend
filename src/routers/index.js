import express from "express";
import userRouter from "./routes/users.route.js";
import commentRouter from "./routes/comment.route.js";
// import messageRouter from "./routes/message.route.js";
import volunteerRouter from "./routes/volunteer.route.js";
import sosRouter from "./routes/sos.route.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import contactRouter from "./routes/contact.route.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/sos", verifyToken, sosRouter);
router.use("/comment", verifyToken, commentRouter);
// router.use("/message", messageRouter);  // coming soon
router.use("/volunteer", verifyToken, volunteerRouter);
router.use("/contacts", verifyToken, contactRouter);
export default router;
