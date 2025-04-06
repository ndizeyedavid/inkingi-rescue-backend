import express from "express";
import volunteerController from "../../controllers/volunteer.controller.js";

const volunteerRouter = express.Router();

volunteerRouter.get("/view/all", volunteerController.getAll);
volunteerRouter.get("/view/:id", volunteerController.getOne);

export default volunteerRouter;
