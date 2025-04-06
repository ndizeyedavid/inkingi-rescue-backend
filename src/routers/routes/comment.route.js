import express from "express";
import commentController from "../../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.get("/view/all", commentController.getAllComments);
commentRouter.get("/view/:id", commentController.getComment);

export default commentRouter;
